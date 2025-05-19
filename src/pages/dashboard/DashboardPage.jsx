import { useEffect, useState } from "react"
import { getPublications } from "../../services/api.jsx"
import { PublicationCard } from "../../components/publication/PublicationCard.jsx"
import { CourseFilter } from "../../components/courseFilter.jsx"

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
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">LearningVlog</h1>
      <CourseFilter setFilteredCourse={setFilteredCourse} />
      <div className="space-y-4">
        {filteredPublications.map((pub, index) => (
          <PublicationCard key={pub?._id || index} publication={pub} />
        ))}
      </div>
    </div>
  )
}

export default DashboardPage;