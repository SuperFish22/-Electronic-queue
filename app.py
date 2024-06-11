from flask import Flask, request, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room

async_mode = None
app = Flask(__name__)

app.config['SECRET_KEY'] = 'ecret!'
socketio = SocketIO(app, async_mode=async_mode)

# список операторов
operators = [
    {'id': 1, 'name': 'Оператор 1', 'status': 'free', 'kek': 'K'},
    {'id': 2, 'name': 'Оператор 2', 'status': 'free', 'kek': 'Z'},
    {'id': 3, 'name': 'Оператор 3', 'status': 'free', 'kek': 'P'},
    {'id': 4, 'name': 'Оператор 4', 'status': 'free', 'kek': 'D'},
]

# очередь пользователей
queue = [{"number":1, "username":"Ivan", "come":"K"}]

# проверка подключение
@socketio.on('connect')
def connect():
    emit('queue_update', {'queue': queue}, broadcast=True)
    print('Client connected')

# проверка отключение
@socketio.on('disconnect')
def disconnect():
    print('Client disconnected')

# Удаляем клиента из очереди
@socketio.on('leave_queue')
def leave_queue(data):
    queue.remove(data['number'])
    emit('queue_update', {'queue': queue}, broadcast=True)

# Добавление клиента в очередь
@socketio.on('next_client')
def pers(json):
    queue.append({'number': len(queue) + 1, 'username': json})
    emit('person_respons', len(queue), broadcast=True)
    emit('queue_update', {'queue': queue}, broadcast=True)

# обнавление очереди
@socketio.on('queue_update')
def queue_update():
    emit('queue_update', {'queue': queue})

@socketio.on('task_assigned')
def task_assigned(task):
    queue.remove(task)
    emit('queue_update', {'queue': queue})

# прием данных об обновлении менеджера
@socketio.on('assign_cabinet')
def assign_cabinet(data):
    print(data)
    userNuber = data['taskId']
    cabinet_id = data['cabinetId']
    # Отправляем сообщение пользователю
    message = f'Номер {userNuber} в кабинете {cabinet_id}'
    emit('assign_queue', message, broadcast=True)
    #emit('leave_queue', data[userNuber], broadcast=True)
    
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # проверка логина и пароля
        return 'Вы вошли в систему!'
    else:
        return render_template('login.html')

@app.route('/monitor', methods=['GET', 'POST'])
def monitor():
    return render_template('monitor.html')

@app.route('/operator/<int:operator_id>')
def operator_page(operator_id):
    operator = next((o for o in operators if o['id'] == operator_id), None)
    if operator:
        return render_template('operator.html', operator=operator)
    else:
        return 'Operator not found', 404

@app.route('/maneger', methods=['GET', 'POST'])
def maneger():
    return render_template('maneger.html')

if __name__ == '__main__':
    socketio.run(app)