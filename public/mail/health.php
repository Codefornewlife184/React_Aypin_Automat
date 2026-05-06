<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/config.php';
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
$configOk = SMTP_HOST !== '' && SMTP_PORT > 0 && SMTP_USER !== '' && SMTP_FROM !== '' && SMTP_TO !== '';
$canConnect = false;
$connErr = null;
set_error_handler(function($errno, $errstr){});
$fp = @fsockopen(SMTP_HOST, SMTP_PORT, $errno, $errstr, 5);
if ($fp) { $canConnect = true; fclose($fp); } else { $canConnect = false; $connErr = $errstr ?: ('errno:' . $errno); }
restore_error_handler();
echo json_encode([
  'ok' => true,
  'php_version' => PHP_VERSION,
  'phpmailer_found' => $base !== null,
  'phpmailer_path' => $base,
  'config_ok' => $configOk,
  'smtp_host' => SMTP_HOST,
  'smtp_port' => SMTP_PORT,
  'smtp_secure' => SMTP_SECURE,
  'can_connect' => $canConnect,
  'connect_error' => $connErr,
  'ts' => date('c'),
]);
