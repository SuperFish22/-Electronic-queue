var socket = io();
let data = [];
let operators = window.appConfig.operator;
let operations = window.appConfig.operations
let currentTask = null;
let currentCabinet = null;
let opr;


// проверка связи
socket.on('connect', function() {
  console.log('Связь есть');
});

console.log(operators);
console.log(operations);

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
    //console.log(user)

    if (operators.operations.split('').some(letter => user.operation.includes(letter)) && user.status === 'waiting' || user.status === 'True') {
      const optionElement = document.createElement('option');
      optionElement.value = user.number;
      optionElement.textContent = user.number;
      userSelectElement.appendChild(optionElement);
    };
  });
});

// Для осуществления выбора и вывода информации по выбранному персонажу
const userSelectElement = document.getElementById('user-select');
userSelectElement.addEventListener('change', function() {

  const userId = userSelectElement.value;
  currentTask = userSelectElement.value;
  document.getElementById('current-task').textContent = `Вы выбрали: ${userId}`;

  data[0].forEach(user => {
    if (user.number === parseInt(userId)) {
      operations.forEach(operation => {
        if (operation.operation_code === user.operation) {
          opr = operation.operation_name;
          currentCabinet = operation.cabinet;
        }
      });
      const userInfo = `
        Номер: ${user.number}
        Операция: ${opr}
        День рождение : ${user.birthdate}
        ФИО: ${user.username}
      `;
      document.getElementById('user-info').textContent = userInfo;

      const users = [user.number, opr, user.birthdate, user.username];
      const table = document.getElementById('operator-table');
      const newColumn = table.insertCell(-1); // Добавляем столбец в конец таблицы

      // Удаляем все ячейки из нового столбца
      // while (newColumn.firstChild) {
      //   newColumn.removeChild(newColumn.firstChild);
      // }

      for (let i = 0; i < users.length; i++) {
        const row = table.rows[i];
        const cell = row.insertCell(1);
        cell.innerHTML = users[i];
      }
    };
  });
});
 


var isFinished = false;

$('#assign-cabinet').on('click', function() {
  if (currentTask && currentCabinet) {
    if (!isFinished) {
      socket.emit('assign_cabinet', { number: currentTask, cabinetId: currentCabinet });
      console.log(`Кабинет ${currentCabinet} назначен пользователю ${currentTask}`);
      $(this).text('Закончить приём');
      isFinished = true;
    } else {
      socket.emit('unassign_cabinet', { number: currentTask, cabinetId: currentCabinet });
      console.log(`Кабинет ${currentCabinet} отменен для пользователя ${currentTask}`);
      $(this).text('Назначить кабинет');
      isFinished = false;
    }
  } else {
    alert("Перед назначением выберите задачу и кабинет.");
  }
});
