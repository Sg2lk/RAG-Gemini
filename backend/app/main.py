from fastapi import FastAPI, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware
from app.pdf_utils import read_pdf
from app.rag import add_to_index, search
from app.llm_client import get_emotions_from_fragments
import os

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        return {"error": "Solo se permiten archivos PDF"}

    content = await file.read()
    os.makedirs("temp_uploads", exist_ok=True)
    temp_file = os.path.join("temp_uploads", os.path.basename(file.filename))
    with open(temp_file, "wb") as f:
        f.write(content)

    text = read_pdf(temp_file)
    add_to_index(text)
    return {"filename": file.filename, "length": len(text), "preview": text[:300] + "..."}

@app.get("/ask")
async def ask(query: str = Query(...)):
    results = search(query)
    return {"query": query, "fragments": results}

@app.post("/analyze-emotions")
async def analyze_emotions(query: str = Query(...)):
    fragments = search(query)
    result = get_emotions_from_fragments(fragments, query=query)
    return {"Output": result}
    #return {"query": query, "fragments": fragments, "emotions": result}