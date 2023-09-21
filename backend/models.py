from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class URL_MAP(Base):
    __tablename__ = "url_map"

    id = Column(Integer, primary_key=True, index=True)
    shorten_url = Column(String)
    original_url = Column(String)
    created_date = Column(String)

class ACCESS_LOG(Base):
    __tablename__ = "access_log"

    id = Column(Integer, primary_key=True, index=True)
    shorten_url = Column(String)
    ip_addr = Column(String)
    access_time = Column(String)