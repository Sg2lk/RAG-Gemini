from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

embedder = SentenceTransformer("all-MiniLM-L6-v2")

chunks = []
index = None

def split_text(text, chunk_size=500, overlap=50):
    chunks_local = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks_local.append(text[start:end])
        start += chunk_size - overlap
    return chunks_local

def add_to_index(text):
    global chunks, index
    new_chunks = split_text(text)
    new_embeddings = embedder.encode(new_chunks)
    if index is None:
        dim = new_embeddings.shape[1]
        index = faiss.IndexFlatL2(dim)
    index.add(np.array(new_embeddings))
    chunks.extend(new_chunks)

def search(query, k=4):
    query_vector = embedder.encode([query])
    distances, indices = index.search(np.array(query_vector), k)
    results = [chunks[i] for i in indices[0]]
    return results