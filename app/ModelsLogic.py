from peewee import IntegrityError
from .Models import *
from .Customer import Customer
from abc import ABC, abstractmethod
from .Validators import *


class ModelAdder(ABC):

    @abstractmethod
    def add(self): pass


class ModelsRemover(ABC):

    @abstractmethod
    def delete(self): pass


class InvalidFieldsException(Exception):

    def __init__(self, user: object):
        listOfFields = user.__dict__.keys()
        res = "Пользователь, которого вы хотите добавить, не существует в базе данных.\nСписок полей:\n"

        for i in listOfFields:
            if not i.startswith("__") and not i.startswith("_"):
                res += i + '\n'

        return super().__init__(res)


class InvalidClassException(Exception):

    def __init__(self):
        return super().__init__("Пользователь, которого вы хотите добавить, не может быть добавлен: он не найден в базе данных или программа не может работать с этим классом, поскольку класс не является экземпляром AbstractModel.")


class IncorrectDataException(Exception):
    
    def __init__(self, d: dict):
        tmp = None
        for i in d:
            if d[i] == False:
                tmp = i
        return super().__init__(f"Неверные данные для добавления. Проблема с {tmp}.")


class PeeweeModelAdder(ModelAdder):

    def add(self, user, **args):
        try:
            if not issubclass(user, AbstractModel):
                raise InvalidClassException()
            
            validator = ValuesValidator()
            d = validator.validate(**args)
            
            if False in d.values():
                raise IncorrectDataException(d)

            user(**args).save()
        except IntegrityError:
            raise InvalidFieldsException(user)
        

"""class PeeweeModelsRemover(ModelsRemover): - todo"""


if __name__ == '__main__':
    m = PeeweeModelAdder()
    m.add(
        Admin,
        name="1",
        surname="Test"
    )