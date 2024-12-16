import json
import os
from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models.schemas import Task, User
from fastapi.responses import FileResponse
import platform 
from fastapi import UploadFile, File
def exportJson(db: Session, user: User, file_name: str):
    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    tasks = db.query(Task).filter(Task.user_id == user.id).all()
    if not tasks:
        raise HTTPException(status_code=404, detail="No tasks found to export")

    tasks_data = [
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "created_at": task.created_at.isoformat() if task.created_at else None
        }
        for task in tasks
    ]

    try:

        if platform.system() == "Windows":
            download_path = os.path.join(os.path.expanduser("~"), "Downloads", file_name)
        else:
            download_path = f"/tmp/{file_name}"
        with open(download_path, "w") as json_file:
            json.dump(tasks_data, json_file, indent=4)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to export tasks: {str(e)}")
    return FileResponse(download_path, media_type="application/json", filename=file_name)

def importJson(db: Session, user: User, file: UploadFile = File(...)):
    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    try:
        contents = file.file.read()
        tasks_data = json.loads(contents)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Failed to read JSON file")

    imported_tasks = []

    for task_data in tasks_data:
        new_task = Task(
            title=task_data.get("title"),
            description=task_data.get("description"),
            status=task_data.get("status", True),
            user_id=user.id
        )
        db.add(new_task)
        imported_tasks.append(new_task)

    db.commit()

    return {"detail": "Tasks imported successfully", "imported_count": len(imported_tasks)}