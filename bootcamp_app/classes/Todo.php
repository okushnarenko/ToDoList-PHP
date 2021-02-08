<?php

class Todo {
    private $conn;

    public function __construct() {
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "test";

        // Create connection
        $this->conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function __destruct() {
        $this->conn->close();
    }

    public function getData() {
        $sql = "SELECT * FROM `todo-tasks`";
        $result = $this->conn->query($sql);
        
        if ($result) {
          if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
              print_r($row);
            }
          } else {
            echo "0 results";
          }
        }
        else {
          echo "Result is wrong";
        }
      }
      
    public function setData() {
      $text = "This is my task";
      $status = true;
      $d = new DateTime();
      $d->setTimezone(new DateTimeZone('Europe/Riga'));
      $createdAt =  $d->format("Y-m-d H:m:s");
      $modifiedAt = $d->format("Y-m-d H:m:s");

        $sql = "INSERT INTO `todo-tasks` (`text`, `status`, `createdAt`, `modifiedAt`) VALUES ('$text', '$status', '$createdAt', '$modifiedAt')";
        $result = $this->conn->query($sql);
        if ($this->conn->error) {
          die("Query request error: " . $this->conn->error);
        }
      
        if ($result === true) {
          echo "ieraksts pievienots";
        }
        else {
          echo "neizdevās";
        }
    }
}