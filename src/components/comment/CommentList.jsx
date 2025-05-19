import { useFetch } from "../shared/hooks/useFetch";
import { getCommentsByPublication } from "../services/api.jsx";

export const CommentsList = ({ publicationId }) => {
  const { data, loading, reload } = useFetch(getCommentsByPublication, publicationId);

  if (loading) return <p>Cargando comentarios...</p>;
  if (!data.success) return <p>Error cargando comentarios.</p>;

  return (
    <div>
      <h3>Comentarios</h3>
      {data.comments.map((comment) => (
        <div key={comment._id}>
          <strong>{comment.name}</strong>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};