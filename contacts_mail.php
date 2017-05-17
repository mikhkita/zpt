<?
include($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

$POST = htmlspecialcharsbx($_POST["POST"]);
$PHONE = htmlspecialcharsbx($_POST["PHONE"]);
$EMAIL = htmlspecialcharsbx($_POST["EMAIL"]);
$SUBJECT = htmlspecialcharsbx($_POST["SUBJECT"]);
$MESSAGE = htmlspecialcharsbx($_POST["MESSAGE"]);

$arEventFields = array(
	"POST" => $POST,
	"PHONE" => $PHONE,
	"EMAIL" => $EMAIL,
	"SUBJECT" => $SUBJECT,
	"MESSAGE" => $MESSAGE
);

$filterTags = array(
	"http://128.fo.ru",
	"КЛИЕНТСКИЕ БАЗЫ",
	"prodawez392@gmail.com",
);

$spam = false;

foreach ($_POST as $i => $value)
	foreach ($filterTags as $j => $tag)
		if( mb_strpos($value, $tag, 0, "UTF-8") !== false )
			$spam = true;

if( (isset($_POST["MAIL"]) && $_POST["MAIL"] != "") || $spam ){
		$data = array(
			"DATA" => implode(PHP_EOL, array_map(function($k, $v) { return "$k: $v"; }, array_keys($_POST), $_POST))
		);
		if( CEvent::Send("SPAM", "s1", $data) ){
			echo "1";
		}else{
			echo "0";
		}
	}else{
		$id_mail = CEvent::Send("SEND_CONTACTS_EMAIL", "s1", $arEventFields, "N", "", "");
		if(isset($id_mail)){	
			echo "1";
		}else{
			echo "0";
		}
	}
?>