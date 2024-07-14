<?php

function lighten($hex): string {
    $red = hexdec(substr($hex, 0, 2)) + 0x40;
    $red = dechex(min($red, 0xff));

    $green = hexdec(substr($hex, 2, 2)) + 0x40;
    $green = dechex(min($green, 0xff));

    $blue = hexdec(substr($hex, 4, 2)) + 0x40;
    $blue = dechex(min($blue, 0xff));

    return $red . $green . $blue;
}

function darken($hex): string {
    $red = hexdec(substr($hex, 0, 2)) - 0x40;
    $red = dechex(max($red, 0x00));
    $red = $red == "0" ? "00" : $red;

    $green = hexdec(substr($hex, 2, 2)) - 0x40;
    $green = dechex(max($green, 0x00));
    $green = $green == "0" ? "00" : $green;


    $blue = hexdec(substr($hex, 4, 2)) - 0x40;
    $blue = dechex(max($blue, 0x00));
    $blue = $blue == "0" ? "00" : $blue;

    return $red . $green . $blue;
}

function make_css_gradient($hex): string {
    $light = lighten($hex);
    $dark = darken($hex);

    return "background-image: linear-gradient(135deg, #$light, #$dark)";
}

function make_rgba($hex, $opacity): string {
    $r = hexdec(substr($hex, 0, 2));
    $g = hexdec(substr($hex, 2, 2));
    $b = hexdec(substr($hex, 4, 2));

    return "rgba($r, $g, $b, $opacity)";
}