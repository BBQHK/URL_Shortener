from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# connection setting for sqlite
# SQLALCHEMY_DATABASE_URL = "sqlite:///URL_Mapping_DB.db"

# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
# )

# connection setting for mysql
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:@localhost:3306/url_mapping_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
