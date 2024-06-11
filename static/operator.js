var socket = io();
let data = [];
let currentTask = null;
let currentCabinet = null;

// проверка связи
socket.on('connect', function() {
  console.log('Связь есть');
});

//обнавление таблицы вывода
socket.on('queue_update', function(json) {
  if (data.length == 0) {
    data.push(json.queue);
  } else {
    data = [];
    data.push(json.queue);
  }
  // вывод очереди
  console.log(data);
  const userSelectElement = document.getElementById('user-select');
  userSelectElement.innerHTML = '<option value="">Выберите пользователя</option>';
  data[0].forEach(user => {
    const optionElement = document.createElement('option');
    optionElement.value = user.number;
    optionElement.textContent = user.number;
    userSelectElement.appendChild(optionElement);
  });
});

const userSelectElement = document.getElementById('user-select');
userSelectElement.addEventListener('change', function() {
  const userId = userSelectElement.value;
  currentTask = userSelectElement.value;
 
});

const cabinetSelectElement = document.getElementById('cabinet-select');
cabinetSelectElement.addEventListener('change', function() {
  currentCabinet = cabinetSelectElement.value;
  console.log(`Выбран кабинет ${currentCabinet}`);
});

$('#assign-cabinet').on('click', function() {
  if (currentTask && currentCabinet) {
    socket.emit('assign_cabinet', { taskId: currentTask, cabinetId: currentCabinet });
    console.log(`Кабинет ${currentCabinet} назначен пользователю ${currentTask}`);
  } else {
    alert("Перед назначением выберите задачу и кабинет.");
  }
});
