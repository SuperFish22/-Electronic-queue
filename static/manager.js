const socket = io();

socket.on('connect', function() {
    console.log('Связь есть');
});

socket.on('person_respons', function(data) {
    alert("Ваше место в очереди:" + data)
});

$("button").on('click', function() {
    var value = $(this).val();
    console.log(value);
    socket.emit('next_client',value );
  });
