const socket = io();

socket.on('connect', function() {
    console.log('Связь есть');
});

socket.on('person_respons', function(data) {
    alert("Ваше место в очереди:" + data)
});

$("button").on('click', function() {
    var value = $(this).val();
    var username = $("#username").val();
    var birthdate = $("#birthdate").val();
    
    if (username && birthdate) {
        console.log(value, username, birthdate);
        socket.emit('next_client', { operation: value, username: username, birthdate: birthdate });
    } else {
        alert("Пожалуйста, заполните имя и дату рождения");
    }
});