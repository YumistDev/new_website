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
        'Body'  => "Hey, you can download the app from ".$link." #KeepitYum",
    );

    //ALLOW USER TO SEND ONE TEXT PER DAY PER PHONE NUMBER

    $sql = $db_yumist->prepare("INSERT INTO `app_downloads_via_text` (phone_number,created_at) VALUES (:phone_number,:created_at)");
    $sql->bindParam(':phone_number',$to,PDO::PARAM_INT);
    $sql->bindParam(':created_at',date('Y-m-d H:i:s',strtotime('Today')),PDO::PARAM_STR);
    $sql->execute();

    //send($post_data);
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

    return json_encode(['code'=>200,'message'=>'Sent']);
}
?>
