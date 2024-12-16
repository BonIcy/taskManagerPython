from sqlalchemy.orm import Session
from src.models.schemas import Task, User
from fastapi import HTTPException

def create_task(db: Session, user: User, title: str, description: str = None):
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    new_task = Task(title=title, description=description, user_id=user.id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

def list_tasks(db: Session, user: User):
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    tasks = db.query(Task).filter(Task.user_id == user.id).all()
    if not tasks:
        raise HTTPException(status_code=404, detail="No tasks found")
    return tasks

def update_task(db: Session, user: User, task_id: int, title: str = None, description: str = None, status: bool = None):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if title is not None:
        task.title = title
    if description is not None:
        task.description = description
    if status is not None:
        task.status = status

    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, user: User, task_id: int):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()
    return {"detail": "Task deleted successfully"}
