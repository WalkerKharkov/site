<?php
if ($_SERVER['REQUEST_METHOD']=='POST'){
    $to="energaleks@gmail.com";
    $subject="Вопрос от ".$_POST['name']."  (".$_POST['mail'].")";
    $content=$_POST['text'];
    mail($to, $subject, $content);
}?>
<script>
    location.replace("../pages/info.html");
</script>

