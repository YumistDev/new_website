<?php

require 'db.php';
date_default_timezone_set('Asia/Kolkata');

global $db_yumist;

$city = $db_yumist->prepare('SELECT z.city_id, l.name, c.city_name,l.id FROM `zones` z JOIN `localities` l ON z.id = l.zone_id
JOIN 	`cities` c ON  z.city_id = c.id group by l.id order by c.id, l.name');
$city->execute();
$sql = $city->fetchAll(PDO::FETCH_ASSOC);

$array = array();
foreach($sql as $value){
  $array[$value['id']]  =  [$value['city_name']=>ucwords(strtolower($value['name']))];
}

echo json_encode($array);
?>
