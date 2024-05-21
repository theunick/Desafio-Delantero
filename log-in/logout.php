<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

session_start();
session_unset();
session_destroy();
header('Content-Type: application/json');

echo json_encode(['success' => true]);
