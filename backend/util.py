import random
import string
import urllib.parse

def is_valid_url(url):
    try:
        result = urllib.parse.urlparse(url)
        return all([result.scheme, result.netloc])
    except ValueError:
        return False

def generate_random_string():
    characters = string.digits + string.ascii_letters
    random_string = ''.join(random.choice(characters) for _ in range(6))
    return random_string