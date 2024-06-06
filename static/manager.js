const person = {name: 'Rene', age: 26}; 
const socket = io();

socket.on('connect', function() {
    console.log('Связь есть');
});

$('#btn1').on('click', function() {
     
    socket.emit('person', person);
  });
