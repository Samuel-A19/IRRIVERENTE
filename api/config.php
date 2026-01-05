<?php
// Importamos las clases de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Cargamos el autoload de Composer
require __DIR__ . '/../vendor/autoload.php';

/**
 * Envía un correo con el código de recuperación
 */
function enviarCorreo($correoDestino, $codigo)
{

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';


    try {
        // Configuración SMTP de Gmail
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;

        // TU correo Gmail (el que creó la clave de aplicación)
        $mail->Username = 'irriverentepizzeria@gmail.com';

        // TU clave de aplicación (NO la contraseña normal)
        $mail->Password = 'pytq ofyz jwik oknm';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Remitente
        $mail->setFrom('irriverentepizzeria@gmail.com', 'Irreverente Pizzería');

        // Destinatario (el usuario)
        $mail->addAddress($correoDestino);

        // Contenido
        $mail->isHTML(true);
        $mail->Subject = 'Recuperación de contraseña';
        $mail->isHTML(true);
        $mail->Subject = 'Recuperación de contraseña - Irreverente';

        $mail->Body = "
<div style='
    max-width:600px;
    margin:auto;
    font-family:Arial, sans-serif;
    background:#ffffff;
    border-radius:8px;
    overflow:hidden;
    border:1px solid #eee;
'>

  <div style='
      background:#f16529;
      color:white;
      padding:20px;
      text-align:center;
  '>
    <h1 style='margin:0;'>Irreverente Pizza</h1>
    <p style='margin:5px 0 0;'>Recuperación de contraseña</p>
  </div>

  <div style='padding:30px; text-align:center;'>
    <p style='font-size:16px; color:#333;'>
      Has solicitado restablecer tu contraseña.
    </p>

    <p style='font-size:14px; color:#666;'>
      Usa el siguiente código para continuar:
    </p>

    <div style='
        margin:20px auto;
        font-size:32px;
        letter-spacing:5px;
        font-weight:bold;
        color:#f16529;
    '>
      $codigo
    </div>

    <p style='font-size:13px; color:#999;'>
      Este código expira en 10 minutos.<br>
      Si no solicitaste este cambio, ignora este correo.
    </p>
  </div>

  <div style='
      background:#f5f5f5;
      text-align:center;
      padding:15px;
      font-size:12px;
      color:#777;
  '>
    © " . date("Y") . " Irreverente Pizza & Pasta
  </div>

</div>
";


        $mail->send();
        return true;

    } catch (Exception $e) {
        return false;
    }
}
