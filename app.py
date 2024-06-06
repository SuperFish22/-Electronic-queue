from flask import Flask, request, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room, close_room, rooms, disconnect

async_mode = None
app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)

person = {'name': 'Rene', 'age': 26};  

@socketio.on('connect')
def test_connect(auth):
    #print(auth)
    emit('my response', {'data': 'Connected'})
    
@socketio.on('person')
def pers(json):
    print(json)
    emit('person_respons', json, broadcast=True)

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

@app.route('/operator', methods=['GET', 'POST'])
def operator():
    return render_template('operator.html')

@app.route('/maneger', methods=['GET', 'POST'])
def maneger():

    return render_template('maneger.html')

if __name__ == '__main__':
    socketio.run(app)