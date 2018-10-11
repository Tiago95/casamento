<?php
ini_set('default_charset', 'UTF-8');
header('Content-type: text/html; charset=utf-8');


require 'phpmail/PHPMailerAutoload.php';

function str_to_utf8 ($contents)
{
    return utf8_decode ($contents);
}

error_reporting(E_ALL ^ E_NOTICE); // hide all basic notices from PHP

    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $events = ($_POST["events"]);
    $guests = ($_POST["guests"]);
    $guestinfo = trim($_POST["guestinfo"]);

    // Check that data was sent to the mailer.
    if (empty($name) OR empty($events) OR empty($guests) OR empty($guestinfo)) {
        // Set a 400 (bad request) response code and exit.
        //http_response_code(400);
        header("HTTP/1.0 400 Not Found");
        //You can customise this message
        echo "Oops! Ocorreu um problema ao enviar sua confirmação. Por favor preencha as informações corretamente e tente novamente.";
        exit;
    }

	//ENVIO DO EMAIL EFETIVAMENTE
	require_once('phpmail/class.phpmailer.php');
	//include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded

	$mail             = new PHPMailer();
    $mail->CharSet = 'UTF-8';
	$body             = file_get_contents('assets/email/template.html');
	$body				= str_replace ("#nome#",$name,$body);
	$body				= str_replace ("#events#",$events,$body);
	$body				= str_replace ("#guests#",$guests,$body);
	$body				= str_replace ("#guestinfo#",$guestinfo,$body);

	$mail->IsSMTP(); // telling the class to use SMTP
	$mail->SMTPDebug  = 2;                     // enables SMTP debug information (for testing)
											   // 1 = errors and messages
											   // 2 = messages only
	$mail->SMTPAuth   = true;                  // enable SMTP authentication
	$mail->SMTPSecure = "tls";                 // sets the prefix to the servier
	$mail->Host       = "in.mailjet.com";      // sets GMAIL as the SMTP server
	$mail->Port       = 2525;                   // set the SMTP port for the GMAIL server
	$mail->Username   = "d5872c75d0fce25cb802c0fa3122c627";  // GMAIL username
	$mail->Password   = "4940695c07ee22ae3eec1da352ea2d5e";            // GMAIL password

	$frommail="confirmacao@flaviaetiago.com.br";
	$mail->SetFrom($frommail, utf8_decode("Casamento Flávia & Tiago"));

	$mail->Subject    = "Confirmação de presença";

	$mail->AltBody    = "www.flaviaetiago.com.br"; // optional, comment out and test

	$mail->MsgHTML($body);

	$mail->AddAddress($email, $name);
	$mail->AddAddress("casamentoflavia.tiago@gmail.com", "Casamento Flávia & Tiago");

	if(!$mail->Send()) {

	  header('HTTP/1.0 500 Internal Server Error');

	  echo "Falha ao registrar sua confirmação. Por favor entre em contato com os noivos: " . $mail->ErrorInfo;

	} else {

	  header('HTTP/1.0 200 OK');

	  echo "Confirmação de presença registrada com sucesso. Muito obrigado!";

	}

?>
