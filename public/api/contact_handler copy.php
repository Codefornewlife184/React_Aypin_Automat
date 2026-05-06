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

// PHPMailer kütüphanesini dahil et
require_once '../PHPMailer/src/Exception.php';
require_once '../PHPMailer/src/PHPMailer.php';
require_once '../PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

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
    
    file_put_contents('contact_messages.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    // PHPMailer ile e-posta gönderme
    $mail = new PHPMailer(true);
    $mail_sent = false;
    
    try {
        // SMTP ayarları - Farklı konfigürasyonları dene
        $mail->isSMTP();
        $mail->SMTPDebug = 0; // Debug modunu kapat
        $mail->Host       = 'mail.webcenter.com.tr';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@webcenter.com.tr';
        $mail->Password   = 'Wc12345678.,.';
        
        // Önce SSL ile 465 portunu dene
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
        
        // Eğer SSL çalışmazsa, TLS ile 587 portunu dene
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        // $mail->Port       = 587;
        
        // Eğer hiçbiri çalışmazsa, şifreleme olmadan 25 portunu dene
        // $mail->SMTPSecure = false;
        // $mail->Port       = 25;
        
        $mail->CharSet    = 'UTF-8';
        $mail->Timeout    = 30;
        
        // Gönderen bilgileri
        $mail->setFrom('info@webcenter.com.tr', 'Web Center İletişim Formu');
        $mail->addAddress('info@webcenter.com.tr', 'Web Center');
        $mail->addReplyTo($email, $name);
        
        // E-posta içeriği
        $mail->isHTML(false);
        $mail->Subject = 'Web Sitesi İletişim Formu: ' . $subject;
        $mail->Body    = "İsim: $name\n";
        $mail->Body   .= "E-posta: $email\n";
        $mail->Body   .= "Konu: $subject\n\n";
        $mail->Body   .= "Mesaj:\n$message\n\n";
        $mail->Body   .= "Gönderim Tarihi: " . date('Y-m-d H:i:s') . "\n";
        $mail->Body   .= "IP Adresi: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
        
        $mail->send();
        $mail_sent = true;
        
    } catch (Exception $e) {
        error_log("PHPMailer SSL Error: " . $mail->ErrorInfo);
        
        // SSL başarısız olursa TLS dene
        try {
            $mail->clearAllRecipients();
            $mail->clearAddresses();
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            
            $mail->setFrom('info@webcenter.com.tr', 'Web Center İletişim Formu');
            $mail->addAddress('info@webcenter.com.tr', 'Web Center');
            $mail->addReplyTo($email, $name);
            
            $mail->send();
            $mail_sent = true;
            
        } catch (Exception $e2) {
            error_log("PHPMailer TLS Error: " . $mail->ErrorInfo);
            
            // TLS de başarısız olursa şifreleme olmadan dene
            try {
                $mail->clearAllRecipients();
                $mail->clearAddresses();
                $mail->SMTPSecure = false;
                $mail->Port = 25;
                
                $mail->setFrom('info@webcenter.com.tr', 'Web Center İletişim Formu');
                $mail->addAddress('info@webcenter.com.tr', 'Web Center');
                $mail->addReplyTo($email, $name);
                
                $mail->send();
                $mail_sent = true;
                
            } catch (Exception $e3) {
                error_log("PHPMailer No Encryption Error: " . $mail->ErrorInfo);
                
                // Son çare olarak basit mail() fonksiyonunu dene
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
                
                if (@mail($to, $email_subject, $email_body, $headers)) {
                    $mail_sent = true;
                    error_log("Mail sent successfully using mail() function");
                } else {
                    error_log("All mail methods failed");
                }
            }
        }
    }
    
    // Başarılı yanıt
    $response_message = 'Mesajınız başarıyla kaydedildi.';
    if ($mail_sent) {
        $response_message = 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.';
    } else {
        $response_message .= ' E-posta bildirimi gönderilemedi, ancak mesajınız kaydedildi.';
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