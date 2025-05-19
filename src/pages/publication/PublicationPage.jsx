import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCommentsByPublication, createComment, getPublicationById } from "../../services/api.jsx";
import { CommentItem } from "../../components/comment/CommentItem";
import { CommentForm } from "../../components/comment/CommentForm";
import toast from "react-hot-toast";

const PublicationPage = () => {
  const { id } = useParams();

  const [publication, setPublication] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);

    getPublicationById(id)
      .then((pubRes) => {
        if (pubRes.error) {
          toast.error("Error al cargar publicación");
          setLoading(false);
        } else {
          const publicationData = pubRes.publication;
          setPublication(publicationData);

          const publicationId = publicationData._id || publicationData.uid;

          if (!publicationId) {
            toast.error("ID de publicación no encontrado");
            setComments([]);
            setLoading(false);
            return;
          }

          getCommentsByPublication(publicationId)
            .then((commentsRes) => {
              if (commentsRes.error) {
                toast.error("Error al cargar comentarios");
                setComments([]);
              } else {
                setComments(commentsRes.comments);
              }
            })
            .catch(() => {
              toast.error("Error al cargar comentarios");
              setComments([]);
            })
            .finally(() => setLoading(false));
        }
      })
      .catch(() => {
        toast.error("Error al cargar publicación");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleCommentSubmit = (data) => {
    if (!publication) return;

    const payload = { ...data, publication: publication._id };
    createComment(payload)
      .then((res) => {
        if (!res.error) {
          toast.success("Comentario agregado");
          loadData();
        } else {
          toast.error("Error al enviar comentario");
        }
      })
      .catch(() => toast.error("Error al enviar comentario"));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg">Cargando publicación...</p>
      </div>
    );
  if (!publication)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500 text-lg">Publicación no encontrada.</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-8">
      <section>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{publication.title}</h1>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{publication.content}</p>
        <p className="mt-4 text-sm text-gray-500 italic">Curso: {publication.course}</p>
      </section>
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2">Comentarios</h2>

        <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
          <CommentForm publicationId={publication.uid} onCommentAdded={loadData} />
        </div>

        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => <CommentItem key={comment._id} {...comment} />)
          ) : (
            <p className="text-gray-500 italic">Aún no hay comentarios.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default PublicationPage;