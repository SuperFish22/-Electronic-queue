let operations = window.appConfig.operations;

var socket = io();

console.log(operations);

socket.on('connect', function() {
    console.log('Связь есть');
    
});

socket.on('queue_update', function(data) {
  console.log(data);
  const queueList = data.queue.filter((item) => item.status === 'waiting').map((item) => `${item.number}`);
  document.getElementById("queue-list").innerHTML = queueList.join(", ");
});

socket.on('queue_update', function(data) {
  console.log(data);
  const assignmentsList = document.getElementById('cabinet-assignments');
  assignmentsList.innerHTML = ''; // clear the list

  data.queue.filter((item) => item.status === 'True').forEach((item) => {
    console.log(item);
    let cabinetText = operations.find((operations) => operations.operation_code === item.operation);
    console.log(cabinetText);
    if (cabinetText) {
      cabinetText = ` в кабинете ${cabinetText.cabinet}`;
    } else {
      cabinetText = '';
    }
    const assignmentHTML = `<li>Клиент ${item.number} ${cabinetText}</li>`;
    assignmentsList.innerHTML += assignmentHTML;
  });
});
/*
socket.on('queue_update', function(data) {
    const queueList = data.queue.map((item) => `${item.number}. ${item.username}`);
    document.getElementById("queue-list").innerHTML = queueList.join(", ");
});*/