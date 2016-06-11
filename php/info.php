<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Filatov Alex web development</title>
    
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/info_style.css">
</head>
<body>
	<header>
		<div class="container controls">
			<div class="row">
				<div class="col-xs-4">
					<button class="btn btn_portfolio">portfolio</button>
				</div>	
				<div class="col-xs-4">	
					<button class="btn btn_contacts">send a mail</button>
				</div>	
				<div class="col-xs-4">	
					<button class="btn btn_info">info</button>
				</div>
			</div>
		</div>	
	</header>
	<main>
		<div class="container content">
			<div class="portfolio"></div>
			<div class="send a mail">
				<?php
				if ($_SERVER['REQUEST_METHOD']=='POST'){
				if ($_POST['name']=='' or $_POST['mailto']=='' or
					$_POST['text']=='' or !$_POST['spam']==''){							
					?>
					<font color='red'><center>missing required data!</center></font>
					<br><a href=index.php?id=contacts><center>back</center></a>
					<?php exit;
				}
				$to="walker_biz@ukr.net";
				$subject="Вопрос от ".$_POST['name']."  ".$_POST['mailto'];
				$content=$_POST['text'];
				mail($to,$subject,$content);
				?>
				<center>successfully</center>
				<br><a href=index.php?id=contacts><center>back</center></a>
				<?php exit;
			}
			?>
			<form method="POST">
				<fieldset class="radius">
					<legend>you can send me an email</legend>
					<p><label for="theme">name</label></p>
					<p><input type="text" name="name" maxlength="20" class="radius" required></p>
					<p><label for="mailto">mail address for feedback</label></p>
					<p><input type="text" name="mailto" maxlength="50" class="radius" required></p>
					<p><label for="text">the contents of your letter</label></p>
					<input type="text" name="spam" maxlength="20" id="spam">
					<div class="tooBig">
						<p><textarea name="text" cols="50" rows="15" width="100%" class="radius" required></textarea></p>
					</div>
				</fieldset>
				<p><input type="image" src="img/send.png" name="okbutton"></p>
			</form>
			</div>
			<div class="info"></div>
		</div>
	</main>
	<footer>
		<div class="copyright">&copy; 2016 Filatov Alex. All rights reserved.</div>
    </footer>
	
    <script src="../js/jquery.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/jquery.backstretch.min.js"></script>
    <script src="../js/infoApp.js"></script>
</body>
</html>