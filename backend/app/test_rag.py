from rag import get_relevant_docs

query = "¿Cuál es la duración del curso?"
result = get_relevant_docs(query)

print("Fragmentos relevantes encontrados:")
for doc in result:
    print(doc[:500])  # solo primeros 500 caracteres
    print("-" * 40)