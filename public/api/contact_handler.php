<?php
// Hata raporlamayı aç
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'error_log');

// UTF-8 karakter kodlaması
mb_internal_encoding('UTF-8');

// CORS ayarları
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

// OPTIONS isteğini yanıtla
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Sadece POST isteklerine izin ver
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    die(json_encode([
        'status' => 'error',
        'message' => 'Geçersiz istek metodu'
    ]));
}

// PHPMailer'ı dahil et
require_once __DIR__ . '/../PHPMailer/src/Exception.php';
require_once __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {
    // Form verilerini al ve temizle
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Validasyon
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        throw new Exception('Tüm alanları doldurunuz');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Geçerli bir e-posta adresi giriniz');
    }

    // Mesajları bir dosyaya kaydet
    $log_entry = date('Y-m-d H:i:s') . " | " .
                 "İsim: $name | " . 
                 "E-posta: $email | " . 
                 "Konu: $subject | " . 
                 "Mesaj: $message" . 
                 "\n";
    
    if (!file_put_contents('contact_messages.txt', $log_entry, FILE_APPEND | LOCK_EX)) {
        throw new Exception('Mesaj kaydedilemedi');
    }
    
    // PHPMailer ile e-posta gönderme
    $mail = new PHPMailer(true);
    $mail_sent = false;
    
    try {
        // SMTP ayarları - DÜZELTME
        $mail->isSMTP();
        $mail->Host       = 'cph3.trdns.com'; // Gerçek SMTP sunucusu
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@webcenter.com.tr';
        $mail->Password   = 'Wc12345678.,.';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        
        // SSL doğrulamasını esnek yap
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );
        
        // Karakter kodlaması
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';
        
        // Gönderen bilgileri
        $mail->setFrom('info@webcenter.com.tr', 'Web Center İletişim Formu');
        $mail->addAddress('info@webcenter.com.tr', 'Web Center');
        $mail->addReplyTo($email, $name);
        
        // E-posta içeriği
        $mail->isHTML(false); // Düz metin
        $mail->Subject = 'Web Sitesi İletişim Formu: ' . $subject;
        
        $email_body = "İsim: $name\n";
        $email_body .= "E-posta: $email\n";
        $email_body .= "Konu: $subject\n\n";
        $email_body .= "Mesaj:\n$message\n\n";
        $email_body .= "Gönderim Tarihi: " . date('Y-m-d H:i:s') . "\n";
        $email_body .= "IP Adresi: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        
        $mail->Body = $email_body;
        
        // E-postayı gönder
        $mail->send();
        $mail_sent = true;
        error_log("PHPMailer ile mail başarıyla gönderildi: $subject");
        
    } catch (Exception $e) {
        error_log("PHPMailer Hatası: " . $mail->ErrorInfo);
        
        // Fallback: Basit PHP mail() fonksiyonu
        $to = "info@webcenter.com.tr";
        $email_subject = "Web Sitesi İletişim Formu: " . $subject;
        $email_body = "İsim: $name\n";
        $email_body .= "E-posta: $email\n";
        $email_body .= "Konu: $subject\n\n";
        $email_body .= "Mesaj:\n$message\n\n";
        $email_body .= "Gönderim Tarihi: " . date('Y-m-d H:i:s') . "\n";
        $email_body .= "IP Adresi: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        
        $headers = "From: info@webcenter.com.tr\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        if (@mail($to, $email_subject, $email_body, $headers)) {
            $mail_sent = true;
            error_log("Fallback mail() ile mail gönderildi: $email_subject");
        } else {
            error_log("Mail gönderilemedi - hem PHPMailer hem de mail() başarısız");
        }
    }
    
    // Başarılı yanıt
    if ($mail_sent) {
        $response_message = 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.';
    } else {
        $response_message = 'Mesajınız başarıyla kaydedildi. E-posta bildirimi gönderilemedi, ancak mesajınız kaydedildi.';
    }
    
    echo json_encode([
        'status' => 'success',
        'message' => $response_message
    ]);
        
} catch (Exception $e) {
    error_log("Contact Form Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
} catch (Error $e) {
    error_log("Contact Form Fatal Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Sunucu hatası oluştu'
    ]);
}
?>