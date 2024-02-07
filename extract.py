import re

# Lee el contenido del archivo
with open('Mayugo.txt', 'r') as file:
    data = file.read()

# Busca todas las líneas que contienen la etiqueta <Key> y extrae su contenido
keys = re.findall(r'<Key>(.*?)<\/Key>', data)

# URL base
base_url = 'https://storage.googleapis.com/bucket-mayugo/'

# Crea las URLs completas
urls = [base_url + key for key in keys]

# Guarda las URLs en un nuevo archivo
with open('urls_generadas.txt', 'w') as output_file:
    for url in urls:
        output_file.write(url + '\n')

print("Se han generado las URLs y se han guardado en 'urls_generadas.txt'.")

