<?php

include "../bootcamp_app/classes/Cars.php";
include "../bootcamp_app/classes/Todo.php";

$cars = new Cars();
$cars->getData();

$todo = new Todo();
$todo->setData();
$todo->getData();