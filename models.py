from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class URL_MAP(Base):
    __tablename__ = "url_map"

    id = Column(Integer, primary_key=True, index=True)
    shorten_url = Column(String)
    original_url = Column(String)
