import { Link } from "react-router-dom";

export function PublicationCard({ publication }) {
    console.log("publication en card:", publication);
  return (
    <div className="card">
      <h2>{publication.title}</h2>
      <p>{publication.description}</p>
      <p>Curso: {publication.course}</p>
      <Link to={`/publication/${publication._id}`}>Ver detalles</Link>
    </div>
  );
}

export default PublicationCard;