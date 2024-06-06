import {getTime} from "./timeProcessing.js";

$(document).ready(function() {
    $(".navbar-text").text(getTime());
})

setInterval(() => {
    $(".navbar-text").text(getTime());
}, 10 * Math.pow(10, 3));

var socket = io();
socket.on('connect', function() {
    console.log('Связь есть');
});

