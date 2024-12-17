# Gestor de Tareas en Python

## Descripción
Este proyecto es una aplicación de gestión de tareas desarrollada en Python. Permite realizar operaciones básicas como:
- Agregar tareas.
- Listar tareas con su estado (completado o pendiente).
- Marcar tareas como completadas.
- Eliminar tareas.
- Exportar tareas a un archivo JSON.
- Importar tareas desde un archivo JSON.

La aplicación cuenta con un **backend** en **FastAPI** y una interfaz **frontend** sencilla en HTML, CSS y JavaScript.

---

## Características
1. **Backend**: Implementado en Python usando FastAPI y SQLAlchemy.  
2. **Base de Datos**: SQLite manejada directamente en el programa.  
3. **Frontend**: HTML y JavaScript que permite interactuar con la API.  
4. **Autenticación**: Login y registro de usuarios.  

---

## Requisitos
- Python 3.8 o superior.  
- Entorno virtual (opcional pero recomendado).  
- Navegador web moderno para ejecutar el **frontend**.

---

## Instalación y Ejecución

### 1. Clonar el repositorio
```
git clone https://github.com/BonIcy/taskManagerPython
```
### 2. Configurar el entorno virtual

En la carpeta raíz ./taskManagerPython, ejecutar:
```
python -m venv .venv
.\.venv\Scripts\Activate
```

### 3. Instalar las dependencias
```
pip install sqlalchemy
pip install aiosqlite
pip install fastapi
pip install uvicorn
pip install werkzeug
pip install pydantic
pip install fastapi[all]
pip install pyjwt
```
### 4. Ejecutar el Backend

En la misma ruta ./taskManagerPython, ingresar a la carpeta backend y ejecutar:
```
cd backend
python main.py
uvicorn main:app --reload
```

Esto iniciará el servidor local de FastAPI en http://127.0.0.1:8000.

### 5. Ejecutar el Frontend

Una vez el backend esté activo:

    Abre el archivo index.html ubicado dentro de la carpeta frontend en cualquier navegador web.
    Accede a la interfaz, primero deberas registrarte e iniciar sesión para acceder a la interfaz del administrador de tareas
