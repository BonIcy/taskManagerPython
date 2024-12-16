en la ruta ./ia_course:

.\.venv\Scripts\Activate
pip install sqlalchemy
pip install aiosqlite
pip install fastapi
pip install uvicorn
pip install sqlalchemy
pip install werkzeug
pip install pydantic
pip install fastapi[all]
pip install pyjwt

cd backend
python main.py
uvicorn main:app --reload



http://127.0.0.1:8000/register
http://127.0.0.1:8000/api/tasks