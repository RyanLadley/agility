from api.core.image.image import Image

class Project:

    @staticmethod
    def map_from_form(form):

        project = Project()

        project.id = form.get("proj_id")
        project.designator = form.get('proj_designator')
        project.name = form.get('proj_name')

        project.image = Image.map_from_form(form)

        return project

    def serialize(self):
        serial = {key:str(value) for key,value in self.__dict__.items()}

        serial['image'] = self.image.serialize()

        return serial