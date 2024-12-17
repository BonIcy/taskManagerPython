from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.authRoutes import router as auth_router
from src.dbConnection.config import init_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


@app.on_event("startup")
def startup():
    init_db()

# routes
app.include_router(auth_router)
app.include_router(auth_router, prefix="/auth")
app.include_router(auth_router, prefix="/api", tags=["Tasks"])
