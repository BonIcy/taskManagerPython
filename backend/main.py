from fastapi import FastAPI
from src.routes.authRoutes import router as auth_router
from src.dbConnection.config import init_db

app = FastAPI()

# iniciar db
@app.on_event("startup")
def startup():
    init_db()

# routes
app.include_router(auth_router)
app.include_router(auth_router, prefix="/auth")
app.include_router(auth_router, prefix="/api", tags=["Tasks"])