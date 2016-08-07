from enum import Enum, unique

@unique
class CardType(Enum):

    Standard  = 0
    Epic      = 1
    Spike     = 2
