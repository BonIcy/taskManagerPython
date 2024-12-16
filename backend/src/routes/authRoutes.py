from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.middlewares.auth import get_current_user
from src.dbConnection.config import get_db
from src.controllers.registerController import register_user
from src.controllers.loginController import login_user
from src.controllers.taskController import create_task, list_tasks, update_task, delete_task
from src.models.schemas import User
from src.models.schemas import UserCreate, UserLogin, TaskCreate, TaskResponse
from typing import List
from src.controllers.jsonController import exportJson, importJson


router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(db=db, username=user.username, email=user.email, password=user.password)

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_user(db=db, email=user.email, password=user.password)

@router.post("/tasks", response_model=TaskResponse)
def add_task(task: TaskCreate, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return create_task(db=db, user=user, title=task.title, description=task.description)

@router.get("/api/tasks")
def get_tasks(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return list_tasks(db=db, user=user)

@router.put("/tasks/{task_id}", response_model=TaskResponse)
def edit_task(task_id: int, task: TaskCreate, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return update_task(db=db, user=user, task_id=task_id, title=task.title, description=task.description)

@router.delete("/tasks/{task_id}")
def remove_task(task_id: int, db: Session = Depends(get_db), user = Depends(get_current_user)):
    return delete_task(db=db, user=user, task_id=task_id)

@router.post("/tasks/export")
def export_tasks(file_path: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return exportJson(db=db, user=user, file_path=file_path)

@router.post("/tasks/import")
def import_tasks(file_path: str, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return importJson(db=db, user=user, file_path=file_path)