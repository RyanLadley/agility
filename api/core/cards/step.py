from api.core.enum.status import Status

class Step:

    def map_from_row(row):

        step = Step()

        step.task = row['task']
        step.assigned = row['assigned']
        step.status = Status(row['status']).name

        return step

    def serialize(self):

        return {key:str(value) for key,value in self.__dict__.items()}