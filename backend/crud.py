from sqlalchemy.orm import Session
import models
from util import generate_random_string

def is_shorten_url_exists(db: Session, shorten_url: str):
    """
    Check if a shorten URL already exists in the database.

    Args:
        db (Session): The database session.
        shorten_url (str): The shorten URL to check.

    Returns:
        bool: True if the shorten URL exists in the database, False otherwise.
    """
    existing_mapping = db.query(models.URL_MAP).filter(models.URL_MAP.shorten_url == shorten_url).first()
    return existing_mapping is not None

def create_shorten_url_mapping(db: Session, original_url: str, created_date: str):
    """
    Creates a new URL mapping with a randomly generated shorten URL.

    Args:
        db (Session): The database session.
        original_url (str): The original URL to be shortened.
        created_date (str): The date when the URL mapping was created.

    Returns:
        URL_MAP: The newly created URL mapping.
    """
    shorten_url = generate_random_string()

    while is_shorten_url_exists(db, shorten_url):
            shorten_url = generate_random_string()

    db_url_mapping = models.URL_MAP(shorten_url=shorten_url, original_url=original_url, created_date=created_date)
    db.add(db_url_mapping)
    db.commit()
    db.refresh(db_url_mapping)
    return db_url_mapping

def get_original_url(db: Session, shorten_url: str):
    """
    Retrieve the original URL from the database based on the provided shorten URL.

    Args:
        db (Session): The database session.
        shorten_url (str): The shorten URL to search for.

    Returns:
        URL_MAP: The URL_MAP object containing the original URL.
    """
    return db.query(models.URL_MAP).filter(models.URL_MAP.shorten_url == shorten_url).first()

def create_access_record(db: Session, shorten_url: str, ip_addr: str, access_time: str):
    """
    Creates a new access log record in the database.

    Args:
        db (Session): The database session.
        shorten_url (str): The shortened URL.
        ip_addr (str): The IP address of the user accessing the URL.
        access_time (str): The time at which the user accessed the URL.

    Returns:
        ACCESS_LOG: The newly created access log record.
    """
    db_access_log = models.ACCESS_LOG(shorten_url=shorten_url, ip_addr=ip_addr, access_time=access_time)
    db.add(db_access_log)
    db.commit()
    db.refresh(db_access_log)
    return db_access_log

def get_access_record(db: Session, shorten_url: str):
    """
    Retrieve all access records for a given shortened URL.

    Args:
        db (Session): The database session.
        shorten_url (str): The shortened URL to retrieve access records for.

    Returns:
        List[models.ACCESS_LOG]: A list of all access records for the given shortened URL.
    """
    return db.query(models.ACCESS_LOG).filter(models.ACCESS_LOG.shorten_url == shorten_url).all()

