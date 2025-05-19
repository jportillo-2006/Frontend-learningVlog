import { useEffect, useState } from "react"
import { getPublications } from "../../services/api.jsx"
import { PublicationCard } from "../../components/publication/PublicationCard.jsx"
import { CourseFilter } from "../../components/courseFilter.jsx"

const Navbar = () => (
  <nav className="bg-gray-700 text-white px-6 py-4 shadow sticky top-0 z-50">
    <div className="max-w-4xl mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">LearningVlog</h1>
      <ul className="flex space-x-6 text-sm">
        <li><a href="/" className="hover:text-gray-300 transition">Inicio</a></li>
      </ul>
    </div>
  </nav>
)

const DashboardPage = () => {
  const [publications, setPublications] = useState([])
  const [filteredCourse, setFilteredCourse] = useState('')

  useEffect(() => {
    getPublications().then(res => {
      if (!res.error && res.publications) {
        const normalized = res.publications.map(pub => ({
          ...pub,
          _id: pub._id || pub.uid
        }));
        setPublications(normalized);
      } else {
        console.error("Error al obtener publicaciones", res.message)
        setPublications([])
      }
    })
  }, [])

  const filteredPublications = filteredCourse
    ? publications.filter(pub => pub.course === filteredCourse)
    : publications

  return (
    <>
      <Navbar />
      <main className="p-6 space-y-6 bg-gray-100 min-h-screen w-full">
        <div className="max-w-screen-xl mx-auto">
            <div className="mb-6">
                <CourseFilter setFilteredCourse={setFilteredCourse} />
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublications.length > 0 ? (
              filteredPublications.map((pub, index) => (
                <div
                  key={pub?._id || index}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col"
                  style={{ height: "320px", minWidth: "280px" }}
                >
                  <PublicationCard publication={pub} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No hay publicaciones para mostrar.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default DashboardPage;