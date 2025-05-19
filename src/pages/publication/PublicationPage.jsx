import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCommentsByPublication, createComment, getPublicationById } from "../../services/api.jsx"
import { CommentItem } from "../../components/comment/CommentItem"
import { CommentForm } from "../../components/comment/CommentForm"
import toast from "react-hot-toast"

const PublicationPage = () => {
  const { id } = useParams()

  const [publication, setPublication] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = () => {
    setLoading(true)

    getPublicationById(id)
      .then((pubRes) => {
        console.log("getPublicationById response:", pubRes)
        if (pubRes.error) {
          toast.error("Error al cargar publicación")
          setLoading(false)
        } else {
          const publicationData = pubRes.publication
          console.log("publicationData:", publicationData)
          setPublication(publicationData)

          const publicationId = publicationData._id || publicationData.uid
          console.log("publicationId para comentarios:", publicationId)

          if (!publicationId) {
            toast.error("ID de publicación no encontrado")
            setComments([])
            setLoading(false)
            return
          }

          getCommentsByPublication(publicationId)
            .then((commentsRes) => {
              console.log("getCommentsByPublication response:", commentsRes)
              if (commentsRes.error) {
                toast.error("Error al cargar comentarios")
                setComments([])
              } else {
                setComments(commentsRes.comments)  // CORRECCIÓN: asignar solo el array de comentarios
              }
            })
            .catch(() => {
              toast.error("Error al cargar comentarios")
              setComments([])
            })
            .finally(() => setLoading(false))
        }
      })
      .catch(() => {
        toast.error("Error al cargar publicación")
        setLoading(false)
      })
  }

  useEffect(() => {
    loadData()
  }, [id])

  const handleCommentSubmit = (data) => {
    if (!publication) return

    const payload = { ...data, publication: publication._id } // CORRECCIÓN: usar _id consistente
    console.log("Payload enviado:", payload)

    createComment(payload)
      .then((res) => {
        if (!res.error) {
          toast.success("Comentario agregado")
          loadData()
        } else {
          toast.error("Error al enviar comentario")
        }
      })
      .catch(() => toast.error("Error al enviar comentario"))
  }

  if (loading) return <p className="p-4">Cargando publicación...</p>
  if (!publication) return <p className="p-4">Publicación no encontrada.</p>

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">{publication.title}</h2>
      <p>{publication.content}</p>
      <p className="text-sm text-gray-500">Curso: {publication.course}</p>

      <h3 className="text-xl mt-4">Comentarios</h3>
      <CommentForm
        publicationId={publication._id}
        onCommentAdded={loadData}
      />
      <div className="space-y-2">
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem key={comment._id} {...comment} />
          ))
        ) : (
          <p className="text-gray-500">Aún no hay comentarios.</p>
        )}
      </div>
    </div>
  )
}

export default PublicationPage