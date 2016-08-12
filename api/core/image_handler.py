import re
from binascii import a2b_base64

def parse_data_uri(data_uri):

    image_type, image_content = data_uri.split(',', 1)
    image_type = re.findall('data:image\/(\w+);base64', image_type)[0]

    image_binary = a2b_base64(image_content)

    return_value = {}
    return_value['type'] = image_type
    return_value['data'] =  image_binary
    
    return return_value

def save_to_file_system(file_url, image):

   with open((file_url), "wb") as file:
        file.write(image)
