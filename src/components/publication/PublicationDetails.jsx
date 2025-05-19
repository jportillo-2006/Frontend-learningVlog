export const PublicationDetails = () => {
  const { id } = useParams();
  const { data, loading, reload } = useFetch(getPublicationById, id);

  if (loading) return <p className="p-6 text-center text-gray-600">Cargando publicación...</p>;
  if (!data.success) return <p className="p-6 text-center text-red-500">Error cargando publicación.</p>;

  const pub = data.publication;

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-8 bg-gray-100 min-h-screen">
      <article className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">{pub.title}</h2>
        <p className="text-gray-700">{pub.description}</p>
        <p className="text-sm text-gray-500"><strong>Curso:</strong> {pub.course}</p>
        <p className="text-sm text-gray-500"><strong>Fecha:</strong> {new Date(pub.createdAt).toLocaleDateString()}</p>
      </article>

      <section className="bg-white p-6 rounded-2xl shadow-md space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800">Comentarios</h3>
        <CommentForm publicationId={pub._id} onCommentAdded={reload} />
        <CommentsList publicationId={pub._id} />
      </section>
    </main>
  );
};