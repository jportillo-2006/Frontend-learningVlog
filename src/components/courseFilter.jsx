export const CourseFilter = ({ setFilteredCourse }) => {
  const handleFilterChange = (e) => {
    setFilteredCourse(e.target.value)
  }

  return (
    <select onChange={handleFilterChange} className="border p-2 rounded">
      <option value="">Todos los cursos</option>
      <option value="Taller">Taller</option>
      <option value="Practica supervisada">Practica supervisada</option>
      <option value="Tecnologia">Tecnologia</option>
    </select>
  )
}