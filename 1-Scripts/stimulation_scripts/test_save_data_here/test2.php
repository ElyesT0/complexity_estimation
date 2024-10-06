<?php
    $filename = "my_data.csv";
    $data = $_POST['filedata'];
    echo ".$data";
    if (!$handle = fopen($filename, 'a+')) {
     	echo "1";
	exit;
    }
    if (fwrite($handle, $data) === FALSE) {
	echo "2";     
   	exit;
    }
    fclose($handle);
?>

