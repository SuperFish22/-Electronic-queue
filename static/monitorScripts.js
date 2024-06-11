var socket = io();

socket.on('connect', function() {
    console.log('Связь есть');
    
});

socket.on('queue_update', function(data) {
    const queueList = data.queue.map((item) => `${item.number}`);
    document.getElementById("queue-list").innerHTML = queueList.join(", ");
});

socket.on('assign_queue', function(data) {
    console.log(data);
    const assignment = {
      username: data.task.username,
      cabinet_id: data.cabinetId
    };
    // обновляем список назначений
    const assignmentsList = document.getElementById('cabinet-assignments');
    const assignmentHTML = `<li>Пользователь ${assignment.username} в кабинете ${assignment.cabinet_id}</li>`;
    assignmentsList.innerHTML += assignmentHTML;
  });

/*
socket.on('queue_update', function(data) {
    const queueList = data.queue.map((item) => `${item.number}. ${item.username}`);
    document.getElementById("queue-list").innerHTML = queueList.join(", ");
});*/