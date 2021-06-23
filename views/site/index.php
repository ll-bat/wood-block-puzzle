<?php

/* @var $this yii\web\View */

$this->title = 'My Yii Application';
?>
<div id="wood-block-puzzle">
    <p id="dd"></p>
    <p id="vv"></p>
    <div class='fallDown' id='backdrop' style="z-index: 1;">
        <div class='menu-buttons' id='menu-buttons'></div>
    </div>
    <div class='navbar'>
        <img src='/images/flash.png' height='50' style='margin: 5px 5px 5px 5%;' />
        <p class='my-font my-font-2' style='margin-left: 15px;'> Wood Block Puzzle </p>
        <div class='score'>
            <p class='my-font best' id='max-score' style='margin-right: 20px'> -- </p>
            <img src='/images/trophy.png' height="40" style='padding-top: 8px'  alt=""/>
            <p class='my-font' id='score' style='margin-left: 20px'> 0 </p>
        </div>
    </div>
    <div class="header" id="header"></div>
    <div class="content" id="content"></div>
    <div class="menu" id="menu" onclick="event.preventDefault()"></div>
    <div class="figure" id="figure"></div>
    <div class='tmp-figure' id='tmp-figure'></div>
</div>

<script src='/js-webpack/build.js'></script>