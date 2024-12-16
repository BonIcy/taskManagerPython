from fastapi import HTTPException, Request, Depends
from sqlalchemy.orm import Session
import jwt
from datetime import datetime, timedelta
from src.dbConnection.config import get_db
from src.models.schemas import User

SECRET_KEY = "T4SKKEY"
ALGORITHM = "HS256"

def create_access_token(user_id: int):
    expire = datetime.utcnow() + timedelta(days=1)
    payload = {"user_id": user_id, "exp": expire}
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

def get_current_user(request: Request, db: Session = Depends(get_db)):
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=401, detail="Token missing")
    if token.startswith("Bearer "):
        token = token[len("Bearer "):]

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

    return user