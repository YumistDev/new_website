<?php

	global $db_yumist;

	try {

		$hostname = 'newfinaldbinstance.cdxjudobo0ll.ap-southeast-1.rds.amazonaws.com';
		$username = 'root';
		$password = 'develop1012';

		$db_yumist = new PDO("mysql:host=$hostname;dbname=yumist_prod", $username, $password);
		$db_yumist->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


	} catch ( PDOException $e ) {

		error_log( $e -> getMessage() );

	}






?>
