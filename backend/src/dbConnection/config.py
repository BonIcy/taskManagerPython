import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.db import Base


DB_PATH = os.path.join(os.path.dirname(__file__), '../../proyectDb.db')

if not os.path.exists(DB_PATH):
    print(f"Error: La base de datos no existe en {DB_PATH}")
engine = create_engine(f'sqlite:///{DB_PATH}', echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
