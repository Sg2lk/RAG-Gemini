import { useState } from "react";

export default function UploadPDF() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleSubmit = async (selectedFile) => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      // Mostramos preview con puntos suspensivos
      setPreview(data.preview + "...");
      setResponse(""); // Limpiamos respuesta previa
    } catch (err) {
      setPreview("");
      setResponse("Error al subir el archivo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (response) {
      setFile(null);
      setQuery("");
      setPreview("");
      setResponse("");
      return;
    }

    if (!query) {
      setResponse("Por favor escribe una query antes de analizar.");
      return;
    }

    setAnalyzing(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/analyze-emotions?query=${encodeURIComponent(query)}`,
        { method: "POST" }
      );
      const data = await res.json();

      setPreview("");
      setResponse(formatResponse(data));
    } catch (err) {
      setResponse("Error al analizar emociones");
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  // Markdown
  const formatResponse = (data) => {
    let text = JSON.stringify(data, null, 2).replace(/\\n/g, "\n");
    text = text.replace(/\\"/g, '"');
    text = text.replace(/\*\*(.*?)\*\*/g, (_, p1) => `<strong>${p1}</strong>`);
    return text;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-white">PDF Rag</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-md">
        <label className="bg-gray-700 p-2 rounded cursor-pointer hover:bg-gray-600 text-center">
          Select PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setFile(selectedFile);
              handleSubmit(selectedFile);
            }}
            className="hidden"
          />
        </label>

        {file && (
          <input
            type="text"
            placeholder="Write a query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white placeholder-gray-400 w-full"
          />
        )}
      </div>

      {file && (
        <button
          onClick={() => {
            if (response) {
              window.location.reload();
            } else {
              handleAnalyze();
            }
          }}
          disabled={analyzing}
          className="mt-4 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white"
        >
          {response ? "Upload new PDF" : analyzing ? "Analyzing..." : "Analyze with your query"}
        </button>
      )}

      {(preview || response) && (
        <div className="mt-6 w-full max-w-md bg-gray-800 p-4 rounded shadow-md text-white">
          <h2 className="text-xl font-semibold mb-2">
            {preview ? "PDF Preview :" : "Gemini Flash Response:"}
          </h2>
          <pre
            className="text-sm overflow-x-auto whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: preview || response }}
          />
        </div>
      )}

      {loading && <p className="mt-4 text-gray-400">PDF Uploading...</p>}
    </div>
  );
}