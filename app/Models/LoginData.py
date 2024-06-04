from peewee import *
from .Model import BaseModel
from .Operator import Operator
from .Admin import Admin
from .Monitor import Monitor
from .setup import settings


class OperatorloginData(BaseModel):

    class Meta:
        db_table = settings["operator_login"]

    id = AutoField()
    operator = ForeignKeyField(Operator)
    login = CharField()
    password = CharField()


    def __str__(self):
        return f"Оператор №{self.operator.id} ({self.operator.name} {self.operator.surname}):\nЛогин: {self.login}\nПароль: -"


class AdminLoginData(BaseModel):

    class Meta:
        db_table = settings["admin_login"]

    id = AutoField()
    admin = ForeignKeyField(Admin)
    login = CharField()
    password = CharField()


    def __str__(self):
        return f"Админ №{self.admin.id} ({self.admin.name} {self.admin.surname}):\nЛогин: {self.login}\nПароль: -"


class MonitorLoginData(BaseModel):

    class Meta:
        db_table = settings["monitor_login"]

    id = AutoField()
    monitor = ForeignKeyField(Monitor)
    login = CharField()
    password = CharField()


    def __str__(self):
        return f"Монитор №{self.monitor.id} ({self.monitor.name}):\nЛогин: {self.login}\nПароль: -"
