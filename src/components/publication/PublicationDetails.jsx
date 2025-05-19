import { useParams } from "react-router-dom";
import { useFetch } from "../shared/hooks/useFetch";
import { getPublicationById } from "../services/api";
import { CommentForm } from "../components/comment/CommentForm";
import { CommentsList } from "../components/comment/CommentsList";

export const PublicationDetails = () => {
  const { id } = useParams();
  const { data, loading, reload } = useFetch(getPublicationById, id);

  if (loading) return <p>Cargando publicación...</p>;
  if (!data.success) return <p>Error cargando publicación.</p>;

  const pub = data.publication;

  return (
    <div>
      <h2>{pub.title}</h2>
      <p>{pub.description}</p>
      <p><strong>Curso:</strong> {pub.course}</p>
      <p><strong>Fecha:</strong> {new Date(pub.createdAt).toLocaleDateString()}</p>

      <CommentForm publicationId={pub._id} onCommentAdded={reload} />
      <CommentsList publicationId={pub._id} />
    </div>
  );
};