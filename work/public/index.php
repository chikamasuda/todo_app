<?php

use MyApp\Database;
use MyApp\Todo;
use MyApp\Utils;

require_once(__DIR__ . '/../app/config.php');

$pdo = Database::getInstance();
$todo = new Todo($pdo);
$todo->processPost();
$todos = $todo->getAll();
?>

<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <title>My Todos</title>
  <link rel="stylesheet" href="css/styles.css">
</head>

<body>
  <main>
    <header>
      <h1>Todos</h1>
      <span
        data-token="<?= Utils::h($_SESSION['token']); ?>"
        class="purge">
        Purge
      </span>
    </header>
    <form action="?action=add" method="post">
      <input type="text" name="title" placeholder="Type new todo.">
      <input type="hidden" name="token" value="<?= Utils::h($_SESSION['token']); ?>">
    </form>
    <ul>
      <?php foreach ($todos as $todo) : ?>
        <li>
          <input type="checkbox" 
            data-id="<?= $todo->is_done ? 'checked' : ''; ?>" 
            data-token="<?= Utils::h($_SESSION['token']); ?>"
          >
          <span><?= Utils::h($todo->title); ?></span>

          <span data-id="<?= Utils::h($todo->id); ?>" data-token="<?= Utils::h($_SESSION['token']); ?>" class="delete">
            ×
          </span>
        </li>
      <?php endforeach; ?>
    </ul>
  </main>
  <script src="js/main.js"></script>
</body>

</html>