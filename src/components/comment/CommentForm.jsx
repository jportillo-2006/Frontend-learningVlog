import { useState } from "react";
import { createComment } from "../../services/api.jsx";
import toast from "react-hot-toast";

export const CommentForm = ({ publicationId, onCommentAdded }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !content) {
      toast.error("Completa todos los campos.");
      return;
    }

    const payload = {
      publication: publicationId,
      name,
      content,
    };

    console.log("Payload enviado a createComment:", payload);

    const result = await createComment(payload);

    if (result.success) {
      toast.success("Comentario enviado.");
      setName("");
      setContent("");
      onCommentAdded();
    } else {
      toast.error("Error al enviar comentario.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 space-y-4">
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
        maxLength={12}
      />
      <textarea
        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Comentario"
        rows={4}
        maxLength={75}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition-colors duration-200"
      >
        Enviar
      </button>
    </form>
  );
};