from enum import Enum, unique

@unique
class Status(Enum):

    Open        = 0
    Development = 1
    QA          = 2
    Closed      = 3
