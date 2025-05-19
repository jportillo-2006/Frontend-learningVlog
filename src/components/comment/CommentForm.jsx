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

    const result = await createComment({
      publicationId,
      name,
      content,
    });

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
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Comentario" />
      <button type="submit">Enviar</button>
    </form>
  );
};