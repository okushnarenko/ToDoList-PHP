<?php include "../bootcamp_app/components/head.php"; ?>
<title>Uzdevumu saraksts - login</title>

        <form action="?page=authenticate&sid=<?php echo $sid;?>" method="post">
            <label for="form-email">E-pasts</label>
            <input type="text" name="username" id="form-email" placeholder="example@gmail.com">
            <label for="form-password">Parole</label>
            <input type="password" name="password">

            <input type="submit" name="submit" value="Nosūtīt">
        </form>