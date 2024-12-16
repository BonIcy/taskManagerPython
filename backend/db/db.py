from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship, declarative_base, sessionmaker
from sqlalchemy.sql import func
from datetime import datetime
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(255), nullable=False)  

    tasks = relationship('Task', back_populates='user', cascade="all, delete-orphan")

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    status = Column(Boolean,default=True)
    user_id = Column(Integer, ForeignKey('users.id'), index=True)  
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship('User', back_populates='tasks')


engine = create_engine('sqlite:///taskManager.db', echo=True)
Base.metadata.create_all(engine)


Session = sessionmaker(bind=engine)
session = Session()
