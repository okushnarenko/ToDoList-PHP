<?php
header('Content-Type: application/json');
$data = $_REQUEST;



if (isset($data['action'])) {
    if ($data['action'] == 'get'){
        echo get();
    }
    elseif ($data['action'] == 'update' && isset($data['todos'])){
        echo update($data['todos']);
    }
    else {
        echo error("wrong data");
    }
}
else {
    echo error();
}


function update($todos) {
    $file_name = '../bootcamp_app/json_database.json';
    file_put_contents($file_name, json_encode($todos));
    return json_encode([
        'status' => 'success',
        'message' => 'data saved'
    ]);            
    console.log($todos);
}

function get() {
    $file_name = '../bootcamp_app/json_database.json';
    if (file_exists($file_name)) {
        return json_encode([
            'status' => 'success',
            'data' => file_get_contents($file_name)
        ]);
    }
    return error('DB file does not exist');
}

function error($msg = 'wrong request') {
    return json_encode([
        'status' => 'error',
        'message' => $msg
    ]);
}

// 1) lai Todo lapā ik pēc sekundes consolī izvadās n+1 ar sākotnējo vērtību n = 1;
// function counter(n){
//     setTimeout( function() {
//         console.log(n);
//         if (n<10) {
//             counter(n+1);
//         }
//     }, 1000);
// }
// counter(1);

// 2) ik pēc sekundes tiek ievākti dati no json_database un ja tie atšķiras tad consolī izvada "true", bet ja vienādi tad "false"

// 3) ik pēc sekundes tiek ievākti dati no json_database un ja tie atšķiras tad tiek pārlādēts uzdevumu saraksts, bet ja vienādi tad nekas nenotiek.

