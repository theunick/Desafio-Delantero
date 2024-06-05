<?php

session_start();

require '../quiz_easy/db_connect.php';

$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

$conn = connectDB();

$query = "SELECT name, password FROM users WHERE name = $1";
$result = pg_prepare($conn, "login_user", $query);
$result = pg_execute($conn, "login_user", array($name));

if ($result && pg_num_rows($result) > 0) {
    $user = pg_fetch_assoc($result);
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_name'] = $name;
        echo json_encode(['success' => true, 'userId' => $_SESSION['user_name']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Incorrect password.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No user found with this name.']);
}

pg_close($conn);
