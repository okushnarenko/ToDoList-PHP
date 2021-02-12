<?php

include_once "../bootcamp_app/classes/DB.php";
class Cars extends DB {      
    public function setData() {
        $this->set([
            "model" => "mercedes",
            "color" => "white"
        ]);
    }
}