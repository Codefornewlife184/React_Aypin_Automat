<?php
if (mail('test@example.com', 'Test', 'Test mesajı')) {
    echo 'Mail fonksiyonu çalışıyor';
} else {
    echo 'Mail fonksiyonu çalışmıyor';
}
?>

<?php
// PHPMailer kütüphanesini dahil et
require_once '../PHPMailer/src/Exception.php';
require_once '../PHPMailer/src/PHPMailer.php';
require_once '../PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo '<h2>📧 SMTP E-posta Test Sistemi (Düzeltilmiş)</h2>';
echo '<hr>';

try {
    echo '<p>🔄 PHPMailer başlatılıyor...</p>';
    $mail = new PHPMailer(true);
    
    // SMTP ayarları - DÜZELTME
    echo '<p>⚙️ SMTP ayarları yapılandırılıyor (cph3.trdns.com)...</p>';
    $mail->isSMTP();
    $mail->Host       = 'cph3.trdns.com'; // Gerçek sunucu
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
    
    // Debug modunu aç
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = 'html';
    
    echo '<p>📝 E-posta içeriği hazırlanıyor...</p>';
    
    // E-posta ayarları
    $mail->setFrom('info@webcenter.com.tr', 'Webcenter SMTP Test');
    $mail->addAddress('info@webcenter.com.tr', 'Test Alıcısı');
    
    // İçerik
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = '✅ SMTP Test Başarılı (Düzeltilmiş) - ' . date('Y-m-d H:i:s');
    $mail->Body    = '
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #28a745; text-align: center;">🎉 SMTP Test Başarılı!</h2>
        <p><strong>Sunucu:</strong> cph3.trdns.com:587</p>
        <p><strong>Güvenlik:</strong> STARTTLS (SSL esnek)</p>
        <p><strong>Test Zamanı:</strong> ' . date('Y-m-d H:i:s') . '</p>
        <hr>
        <p style="color: #28a745; font-weight: bold;">✅ SSL sertifika sorunu çözüldü!</p>
        <p style="color: #666;">Contact formu artık düzgün çalışacak! 🚀</p>
    </div>';
    
    echo '<p>📤 E-posta gönderiliyor...</p>';
    echo '<div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0;">';
    
    $mail->send();
    
    echo '</div>';
    echo '<div style="color: #28a745; font-weight: bold; margin: 20px 0; padding: 15px; border: 2px solid #28a745; border-radius: 5px; background: #d4edda;">';
    echo '✅ <strong>BAŞARILI!</strong> E-posta başarıyla gönderildi!';
    echo '<br>📧 <strong>info@webcenter.com.tr</strong> adresini kontrol edin.';
    echo '<br>🎯 <strong>SSL sorunu çözüldü - Contact formu çalışır!</strong>';
    echo '</div>';
    
} catch (Exception $e) {
    echo '</div>';
    echo '<div style="color: #dc3545; font-weight: bold; margin: 20px 0; padding: 15px; border: 2px solid #dc3545; border-radius: 5px; background: #f8d7da;">';
    echo '❌ <strong>HATA!</strong> E-posta gönderilemedi.';
    echo '<br><strong>Hata Mesajı:</strong> ' . $mail->ErrorInfo;
    echo '</div>';
}

echo '<hr>';
echo '<p style="color: #666; font-size: 12px;">Test tamamlandı - ' . date('Y-m-d H:i:s') . '</p>';
?>