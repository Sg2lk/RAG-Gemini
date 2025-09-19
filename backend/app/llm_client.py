import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Cargar el .env desde la misma carpeta donde está este archivo
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

# Obtener la API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("No se encontró la API key en las variables de entorno")

# Crear el cliente pasando explícitamente la API key
client = genai.Client(api_key=api_key)

def get_emotions_from_fragments(fragments, query: str):
    """
    Recibe una lista de fragmentos de texto y devuelve la interpretación de emociones
    usando Gemini Flash 2.5.
    """
    fragments_text = " ".join(fragments)
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"Consulta: {query}\nTexto: {fragments_text}",
        config=types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_budget=0)  # Desactiva thinking
        ),
    )
    return response.text
