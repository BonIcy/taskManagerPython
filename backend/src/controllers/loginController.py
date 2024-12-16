from werkzeug.security import check_password_hash
from fastapi import HTTPException
from src.middlewares.auth import create_access_token
from sqlalchemy.orm import Session
from src.models.schemas import User

def login_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not check_password_hash(user.password, password):
        raise HTTPException(status_code=400, detail="Invalid password")
    token = create_access_token(user_id=user.id)
    return {"access_token": token, "token_type": "Bearer"}
