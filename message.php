<?php

require 'db.php';
date_default_timezone_set('Asia/Kolkata');

global $db_yumist;


//IF THE PHONE NUMBER IS SET
 if(isset($_POST['phone_number'])){
  $phone_number  = $_POST['phone_number'];
  sendSms($phone_number,$db_yumist);
 }



function sendSms($to,$db_yumist) {

    $link = "https://yumist.com/download";
    $post_data = array(
        'To'    => "$to",
        'Body'  => "Please visit ".$link." to get the Yumist app. #KeepitYum :)",
    );

    //ALLOW USER TO SEND ONE TEXT PER DAY PER PHONE NUMBER
    $date = date('Y-m-d H:i:s',strtotime('Today'));

    $check_if_message_sent_today = $db_yumist->prepare("SELECT `phone_number` FROM `app_downloads_via_text` where `phone_number` = :phone_number AND   `created_at` = :date_today ");
    $check_if_message_sent_today->bindParam(':phone_number',$to,PDO::PARAM_INT);
    $check_if_message_sent_today->bindParam(':date_today',$date,PDO::PARAM_STR);
    $check_if_message_sent_today->execute();
    $count = $check_if_message_sent_today->rowCount();

    if($count > 0)
       echo json_encode(['code'=>900,'message'=>'We have sent you the link already.']);
    else
    {
    $sql = $db_yumist->prepare("INSERT INTO `app_downloads_via_text` (phone_number,created_at) VALUES (:phone_number,:created_at)");
    $sql->bindParam(':phone_number',$to,PDO::PARAM_INT);
    $sql->bindParam(':created_at',$date,PDO::PARAM_STR);
    $sql->execute();
    send($post_data);
    }

}

function send($post_data) {

    $exotel_sid = "yumist"; // Your Exotel SID - Get it from here: http://my.exotel.in/Exotel/settings/site#api-settings
    $exotel_token = "720e72ce8ffa659cf1c639970495d5a830bf4007"; // Your exotel token - Get it from here: http://my.exotel.in/Exotel/settings/site#api-settings

    $url = "https://".$exotel_sid.":".$exotel_token."@twilix.exotel.in/v1/Accounts/".$exotel_sid."/Sms/send";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_VERBOSE, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FAILONERROR, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_data));

    $http_result = curl_exec($ch);
    $error = curl_error($ch);
    $http_code = curl_getinfo($ch ,CURLINFO_HTTP_CODE);

    curl_close($ch);

    error_log( "Response = ".$http_result);

    echo json_encode(['code'=>200,'message'=>'Sent']);
}


if(isset($_POST['contact_hidden_field'])){
  $full_name = isset($_POST['full_name']) ? filter_var($_POST['full_name'], FILTER_SANITIZE_STRING): NULL;
  $phone = isset($_POST['phone']) ? $_POST['phone'] : NULL;
  $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : NULL;
  $message = isset($_POST['message']) ? trim(preg_replace('/\s+/', '  ', $_POST['message'])) : NULL;

  sendContactMail($full_name, $phone, $email, $message);
}

 function sendContactMail($full_name, $phone,$email, $message) {

         $api_key = 'h-bMfII45OPZvGlaf5-Nyg';
         $subject = 'From One WebUser to a Yumist';
         $from = $email;
         $to = 'rishab@yumist.com';

         $uri = 'https://mandrillapp.com/api/1.0/messages/send-template.json';
         $postString = '{
                 "key": "' . $api_key . '",
                 "template_name": "query-from-webpage-1",
                 "template_content": [{"name": "header","content": "'.$message.'"}],
                 "message": {
                 "subject": "' . $subject . '",
                 "from_email": "' . $from . '",
                 "from_name": "' . $full_name . '",
                 "to": [ { "email": "' . $to . '", "name": "' . 'Yumist' . '" } ],
                 "merge_vars": [
                        {
                             "rcpt": "'.$to.'",
                             "vars": [
                                 {
                                     "name": "CONTENT",
                                     "content": "'. $message .'"
                                 },
                                 {
                                     "name" : "NAME",
                                     "content" : "'.$full_name.'"
                   								},
                   								{
                   									"name" : "NUMBER",
                   									"content" : "'.$phone.'"
                   								}
                             ]
                         }
                 ],
                 "track_opens": true,
                 "track_clicks": true,
                 "auto_text": true,
                 "auto_html" : true,
                 "url_strip_qs": true,
                 "preserve_recipients": true
               },
                 "async": false
               }';
         $ch = curl_init();
         curl_setopt($ch, CURLOPT_URL, $uri);
         curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true );
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true );
         curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
         curl_setopt($ch, CURLOPT_POST, true);
         curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);
         $result = curl_exec($ch);

         if($result)
             echo 'Sent';
         else
             echo 'Not Sent';

     }

?>
