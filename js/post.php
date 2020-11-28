<?php

$name = $_POST['name'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$phone = $_POST['phone'];

if($name === '' || $lastname === '' || $email === '' || $phone === '') {
    echo json_encode('Llena los campos');
} else {
    echo json_encode('Correcto: <br>Nombre:'.$name.' <br>Apellido:'.$lastname.'
    <br>Email:'.$email.' <br>Telefono:'.$phone.'');
}
