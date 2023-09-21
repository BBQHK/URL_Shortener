from sqlalchemy.orm import Session
import models
from util import generate_random_string

def is_shorten_url_exists(db: Session, shorten_url: str):
    existing_mapping = db.query(models.URL_MAP).filter(models.URL_MAP.shorten_url == shorten_url).first()
    return existing_mapping is not None

def create_shorten_url_mapping(db: Session, original_url: str):
    shorten_url = generate_random_string()

    while is_shorten_url_exists(db, shorten_url):
            shorten_url = generate_random_string()

    db_url_mapping = models.URL_MAP(shorten_url=shorten_url, original_url=original_url)
    db.add(db_url_mapping)
    db.commit()
    db.refresh(db_url_mapping)
    return db_url_mapping

def get_original_url(db: Session, shorten_url: str):
    return db.query(models.URL_MAP).filter(models.URL_MAP.shorten_url == shorten_url).first()

def create_access_record(db: Session, shorten_url: str, ip_addr: str, access_time: str):
     db_access_log = models.ACCESS_LOG(shorten_url=shorten_url, ip_addr=ip_addr, access_time=access_time)
     db.add(db_access_log)
     db.commit()
     db.refresh(db_access_log)
     return db_access_log

def get_access_record(db: Session, shorten_url: str):
     return db.query(models.ACCESS_LOG).filter(models.ACCESS_LOG.shorten_url == shorten_url).all()