# RAG-PDF Reader con Gemini Flash 2.5

Este proyecto es un **lector de PDFs potenciado con IA**, capaz de analizar documentos y responder preguntas sobre su contenido, así como extraer emociones o patrones según la consulta que se haga. Se basa en la técnica de **RAG (Retrieval-Augmented Generation)** para combinar búsqueda de información y generación de texto.

---

## Descripción del proyecto

El sistema permite:

1. Subir archivos PDF y extraer su texto.
2. Indexar el contenido en vectores semánticos usando **embeddings**.
3. Consultar el contenido del PDF con preguntas personalizadas.
4. Analizar emociones o extraer insights mediante la IA **Gemini Flash 2.5**.
5. Visualizar las respuestas en un frontend React, interpretando Markdown para formato enriquecido.

El flujo general es:

---

## Tecnologías y librerías utilizadas

- **FastAPI:** Backend para gestionar uploads de PDFs y consultas.
- **React + TailwindCSS:** Frontend interactivo y estilizado.
- **python-docx / PyPDF2 / fitz:** Para lectura y extracción de texto de PDFs.
- **SentenceTransformers:** Librería para generar **embeddings** de los fragmentos de texto.
- **FAISS (Facebook AI Similarity Search):** Para indexar y buscar vectores de manera eficiente.
- **Gemini Flash 2.5 (Google):** Modelo de IA encargado de generar la interpretación de emociones o respuestas a consultas.
- **dotenv:** Para cargar variables de entorno como la API key de Gemini.
- **CORS Middleware:** Permite comunicación entre el frontend y backend.

---

## Funcionamiento técnico

1. **Lectura del PDF:**  
   Se extrae todo el texto del PDF y se divide en **fragmentos o chunks** de tamaño configurable (por ejemplo, 300 caracteres con solapamiento de 50). Esto permite búsquedas más precisas.

2. **Embeddings:**  
   Cada fragmento se transforma en un vector de alta dimensión usando `SentenceTransformer`. Esto permite representar semánticamente el contenido.

3. **Indexación con FAISS:**  
   Todos los vectores se guardan en un índice FAISS, que permite buscar los fragmentos más relevantes ante cualquier consulta del usuario.

4. **Consulta y generación de respuesta:**  
   - El usuario envía su query desde el frontend.  
   - Se buscan los fragmentos más relevantes usando FAISS.  
   - Los fragmentos se envían a **Gemini Flash 2.5**, que genera una respuesta coherente y enriquecida según el contexto y la consulta.

5. **Frontend React:**  
   - Muestra la **preview del PDF** tras subirlo.  
   - Permite al usuario escribir consultas personalizadas.  
   - Presenta la **respuesta de la IA**, interpretando Markdown para negritas, listas y saltos de línea.

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
