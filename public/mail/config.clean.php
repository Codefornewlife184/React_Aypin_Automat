<?php
define('SMTP_HOST', getenv('SMTP_HOST') ?: 'mail.aypinotomat.com');
define('SMTP_PORT', (int)(getenv('SMTP_PORT') ?: 587));
define('SMTP_SECURE', getenv('SMTP_SECURE') ?: 'tls');
define('SMTP_USER', getenv('SMTP_USER') ?: 'info@aypinotomat.com');
define('SMTP_PASS', getenv('SMTP_PASS') ?: '');
define('SMTP_FROM', getenv('SMTP_FROM') ?: 'info@aypinotomat.com');
define('SMTP_FROM_NAME', getenv('SMTP_FROM_NAME') ?: 'Aypin Otomat');
define('SMTP_TO', getenv('SMTP_TO') ?: 'info@aypinotomat.com');
$origins = getenv('ALLOW_ORIGINS');
define('ALLOW_ORIGINS', $origins ? explode(',', $origins) : ['https://aypinotomat.com','http://localhost:3000']);
