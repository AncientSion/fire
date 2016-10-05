<?php

session_start();
session_destroy();
session_unset();


header('Location: index.php');

?>

<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' href='style.css'/>
	<script src="jquery-2.1.1.min.js"></script>
	<script src='script.js'></script>
</head>
	<body>
	LOGOUT !
	</body>
</html>

<script>
</script>
