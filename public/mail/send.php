<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
require __DIR__ . '/config.php';
date_default_timezone_set(getenv('APP_TZ') ?: 'Europe/Istanbul');
$logFile = __DIR__ . '/send.log';
$log = function($payload) use ($logFile) {
  $payload['ts'] = date('c');
  @file_put_contents($logFile, json_encode($payload) . PHP_EOL, FILE_APPEND);
};
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOW_ORIGINS, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
  exit;
}
$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['user_email'] ?? ''));
$subject = trim((string)($_POST['subject'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
if ($name === '' || $email === '' || $subject === '' || $message === '') {
  http_response_code(422);
  echo json_encode(['ok' => false, 'message' => 'Missing fields']);
  exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'message' => 'Invalid email']);
  exit;
}
$log(['event' => 'attempt', 'name' => $name, 'email' => $email, 'subject' => $subject]);
$paths = [
  __DIR__ . '/PHPMailer/src/',
  __DIR__ . '/phpmailer/src/',
  dirname(__DIR__) . '/PHPMailer/src/',
  dirname(__DIR__) . '/phpmailer/src/',
  dirname(__DIR__, 2) . '/vendor/phpmailer/phpmailer/src/',
];
$base = null;
foreach ($paths as $p) {
  if (file_exists($p . 'PHPMailer.php') && file_exists($p . 'SMTP.php') && file_exists($p . 'Exception.php')) { $base = $p; break; }
}
if ($base === null) {
  $autoloads = [
    dirname(__DIR__, 2) . '/vendor/autoload.php',
    dirname(__DIR__) . '/vendor/autoload.php',
  ];
  $loaded = false;
  foreach ($autoloads as $a) { if (file_exists($a)) { require $a; $loaded = true; break; } }
  if (!$loaded) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Server mailer missing']);
    exit;
  }
} else {
  require $base . 'Exception.php';
  require $base . 'PHPMailer.php';
  require $base . 'SMTP.php';
}
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
try {
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host = SMTP_HOST;
  $mail->SMTPAuth = true;
  $mail->Username = SMTP_USER;
  $mail->Password = SMTP_PASS;
  $mail->SMTPSecure = SMTP_SECURE;
  $mail->Port = SMTP_PORT;
  $mail->Timeout = 15;
  $debug = getenv('SMTP_DEBUG');
  if ($debug && $debug !== '0') {
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) { error_log("SMTP:$level $str"); };
  }
  $allowSelf = getenv('SMTP_ALLOW_SELF_SIGNED');
  if ($allowSelf && $allowSelf !== '0') {
    $mail->SMTPOptions = [
      'ssl' => [
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true,
      ],
    ];
  }
  $mail->CharSet = 'UTF-8';
  $mail->isHTML(true);
  $mail->setFrom(SMTP_FROM, SMTP_FROM_NAME);
  $mail->addAddress(SMTP_TO);
  $bcc = getenv('SMTP_BCC');
  if ($bcc) { $mail->addBCC($bcc); }
  $mail->addReplyTo($email, $name);
  $mail->Subject = 'Aypin Otomat Sitesi | ' . $subject;
  $n = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
  $em = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
  $sj = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
  $msg = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
  $ip = $_SERVER['REMOTE_ADDR'] ?? '';
  $ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
  $ref = $_SERVER['HTTP_REFERER'] ?? '';
  $now = date('d.m.Y H:i:s');
  $mail->Body = '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6">'
    . '<h2 style="margin:0 0 12px">Aypin Otomat Sitesi İletişim Mesajı</h2>'
    . '<table style="border-collapse:collapse;width:100%"><tbody>'
    . '<tr><td style="font-weight:600;width:140px;padding:6px 8px">İsim</td><td style="padding:6px 8px">' . $n . '</td></tr>'
    . '<tr><td style="font-weight:600;width:140px;padding:6px 8px">Email</td><td style="padding:6px 8px">' . $em . '</td></tr>'
    . '<tr><td style="font-weight:600;width:140px;padding:6px 8px">Konu</td><td style="padding:6px 8px">' . $sj . '</td></tr>'
    . '<tr><td style="font-weight:600;width:140px;padding:6px 8px">Mesaj</td><td style="padding:6px 8px"><div style="white-space:pre-wrap">' . $msg . '</div></td></tr>'
    . '<tr><td style="font-weight:600;width:140px;padding:6px 8px">Tarih ve Saat</td><td style="padding:6px 8px">' . $now . '</td></tr>'
    . '<tr><td style="font-weight:600;width:140px;padding:6px 8px">Referans Site</td><td style="padding:6px 8px">' . htmlspecialchars($ref, ENT_QUOTES, 'UTF-8') . '</td></tr>'
    . '</tbody></table></div>';
  $mail->AltBody = "Aypin Otomat Sitesi İletişim Mesajı\n"
    . "İsim: {$name}\n"
    . "Email: {$email}\n"
    . "Konu: {$subject}\n"
    . "Mesaj:\n{$message}\n\n"
    . "Tarih: {$now}\n"
    . "Referans Site: {$ref}\n";
  $mail->send();
  $log(['event' => 'sent', 'to' => SMTP_TO, 'from' => SMTP_FROM, 'reply' => $email]);
  echo json_encode(['ok' => true, 'message' => 'Sent']);
} catch (Exception $e) {
  http_response_code(500);
  $err = isset($mail) ? $mail->ErrorInfo : null;
  $log(['event' => 'error', 'message' => $e->getMessage(), 'errorInfo' => $err]);
  echo json_encode(['ok' => false, 'message' => 'Send error', 'error' => $e->getMessage(), 'errorInfo' => $err]);
}
