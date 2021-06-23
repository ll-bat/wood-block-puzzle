<?php

/* @var $this View */
/* @var $content string */

use yii\helpers\Html;
use yii\web\View;
use app\assets\AppAsset;

AppAsset::register($this);

$logo = Yii::$app->session->get('game._logo', '/images/flash.png');
$logoText = Yii::$app->session->get('game._logo_text', 'Wood Block Puzzle');
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php $this->registerCsrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <link rel="stylesheet" href="/css/game-style.css" />
</head>
<body>
<?php $this->beginBody() ?>

<div class="main">
    <div class='navbar' id="site-navbar" style="border-bottom: 2px inset rgba(167,83,26,0.84)">
        <div class="d-flex">
            <img src='<?= $logo ?>' class="m-2 ml-5" height='50' alt="logo" style="margin-top: 12px !important;"/>
            <p class='my-font my-font-2 my-2 mt-3 mx-3'> <?= $logoText ?> </p>
        </div>
    </div>
    <?= $content ?>
</div>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
