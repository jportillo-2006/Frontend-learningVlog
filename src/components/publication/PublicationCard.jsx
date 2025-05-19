import { Link } from "react-router-dom";

export function PublicationCard({ publication }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 max-w-md mx-auto hover:shadow-md transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{publication.title}</h2>
      <p className="text-gray-700 mb-4">{publication.description}</p>
      <p className="text-sm text-gray-500 mb-4">Curso: <span className="font-medium text-gray-800">{publication.course}</span></p>
      <Link
        to={`/publication/${publication._id}`}
        className="inline-block text-center w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Ver detalles
      </Link>
    </div>
  );
}

export default PublicationCard;