from .setup import settings
from peewee import *
from .Model import BaseModel


class Monitor(BaseModel):

    class Meta:
        db_table = settings["monitors_table"]

    id = AutoField()
    name = CharField()


    def __str__(self):
        return f"Монитор №{self.id}, имя: {self.name}"


