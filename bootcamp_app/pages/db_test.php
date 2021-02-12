<?php

include "../bootcamp_app/classes/Cars.php";
include "../bootcamp_app/classes/Todo.php";

$cars = new Cars('cars');
//$cars->setData();
$cars->update(2, ['color' => 'orange', 'model' => "shkoda"]);
echo $cars->last_message;
$cars->get();
echo $cars->last_message;

$todo = new Todo('todo-tasks');
//$todo->setData();
$todo->get();
echo $cars->last_message;