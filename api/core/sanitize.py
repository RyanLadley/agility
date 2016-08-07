import re

def form_keys(form):

    #convert keys from camel case to snake case
    for key, value in form.items():
        form[re.sub('(?!^)([A-Z]+)', r'_\1', key).lower()] = form.pop(key)

    return form