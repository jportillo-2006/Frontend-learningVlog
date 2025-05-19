export const CourseFilter = ({ setFilteredCourse }) => {
  const handleFilterChange = (e) => {
    setFilteredCourse(e.target.value);
  };

  return (
    <select
      onChange={handleFilterChange}
      className="
        w-full
        max-w-xs
        bg-gray-100 
        border 
        border-gray-300 
        rounded-md 
        p-2 
        text-gray-700
        shadow-sm
        focus:outline-none 
        focus:ring-2 
        focus:ring-gray-400 
        focus:border-gray-500
        transition
        duration-200
        ease-in-out
        cursor-pointer
      "
    >
      <option value="">Todos los cursos</option>
      <option value="Taller">Taller</option>
      <option value="Practica supervisada">Practica supervisada</option>
      <option value="Tecnologia">Tecnologia</option>
    </select>
  );
};