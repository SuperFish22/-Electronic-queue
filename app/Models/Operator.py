from .Model import BaseModel
from .setup import settings
from peewee import *


class OperatorAttributeException(Exception):
    def __init__(self, attr, val):
        super().__init__("Ошибка при настройке атрибута ({attribute}: {value})".format(attribute=attr, value=val))


class Operator(BaseModel):

    class Meta:
        db_table = settings["operators_table"]

    id = AutoField()
    name = CharField()
    surname = CharField()
    email = CharField()


    def __str__(self):
        return "Оператор #{id} ({name} {surname}{email})".format(id=self.id, name=self.name, surname=self.surname, email=(", email: {email}".format(email=self.email) ) if self.email != None else "") 


if __name__ == '__main__':
    Operator(
        name="Igor",
        surname="Test"
    ).save()
    print("ok")