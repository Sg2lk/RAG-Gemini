# 📄 RAG-Gemini

Un proyecto de **Retrieval-Augmented Generation (RAG)** que permite **subir documentos PDF**, obtener una **vista previa del contenido** y realizar consultas usando **Gemini Flash** para generar respuestas basadas en los datos del archivo.

---

## 🚀 Tecnologías utilizadas

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) – Framework backend en Python
- [Uvicorn](https://www.uvicorn.org/) – Servidor ASGI para FastAPI
- [Google Generative AI (Gemini Flash)](https://ai.google.dev/) – Modelo de IA usado para responder queries
- Procesamiento de documentos PDF con **PyPDF2**

### Frontend
- [React](https://react.dev/) con Vite
- Hooks de React (`useState`, `useEffect`)
- Estilos con **TailwindCSS**

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio
  ```bash
  git clone https://github.com/Sg2lk/RAG-Gemini.git
  cd RAG-Gemini
  ```

### 2. Backend (FastAPI)
  #### 1. Crear un entorno virtual:
  ```bash
  cd backend
  python -m venv env
  source env/bin/activate  # En Linux/Mac
  env\Scripts\activate     # En Windows
  ```
  #### 2. Instalar dependencias:
  ```bash
  pip install -r requirements.txt
  ```
  #### 3. Configurar variables de entorno en un archivo .env:
  ```bash
  GEMINI_API_KEY=tu_api_key
  ```
  #### 4. Ejecutar el servidor:
  ```bash
  uvicorn app.main:app --reload
  ```

### 3. Frontend (React)
  #### 1. Entrar en la carpeta frontend:
  ```bash
  cd ../frontend
  ```

  #### 2. Instalar dependencias:
  ```bash
  npm install
  ```

  #### 3. Ejecutar en modo desarrollo:
  ```bash
  npm run dev
  ```

## 🖥️ Uso

- Abrir la aplicación en el navegador (por defecto en http://localhost:5173)
- Subir un archivo PDF
- Ver la preview del contenido extraído
- Ingresar una consulta en la caja de texto
- Recibir la respuesta generada por Gemini Flash en base al documento

## 🛡️ Seguridad
- El archivo .env contiene la API Key de Gemini y no debe subirse al repositorio (está en .gitignore).
- Si accidentalmente se sube, revocar la clave y generar una nueva.

## 🌟 Futuras mejoras
- Soporte para múltiples PDFs
- Historial de consultas
- Respuestas enriquecidas con citas a los fragmentos del documento
- Despliegue en la nube (Render / Vercel)
