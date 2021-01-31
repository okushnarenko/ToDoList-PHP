<?php include "../bootcamp_app/components/head.php"; ?>
<title>Uzdevumu saraksts</title>


<?php include "../bootcamp_app/components/navigation.php"; ?>

<h1>todo page</h1>
<a href="?page=logout">logout</a>

<form action="" class="new-task">
    <textarea name="task" required></textarea>
    <button type="submit">Izveidot</button>
</form>
<div class="task-list">
    <div class="template">
        <pre></pre>
        <a href="#" class="option"
            ><svg
            viewBox="0 0 3 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <circle cx="1.5" cy="1.5" r="1.5" fill="black" />
            <circle cx="1.5" cy="6.5" r="1.5" fill="black" />
            <circle cx="1.5" cy="11.5" r="1.5" fill="black" />
            </svg>
        </a>
        <a href="#" class="save">Save</a>
        <div class="options">
            <a href="#" class="edit">edit</a>
            <a href="#" class="remove">remove</a>
        </div>
    </div>
</div>

<script>let action = "<?php get_url("?page=request") ?>";</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="script.js"></script>