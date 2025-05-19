import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/learningVlog/v1",
    timeout: 5000
})

export const getPublications = async ({
  limite = 10,
  desde = 0,
  course = '',
  sortBy = 'createdAt',
  order = 'desc',
} = {}) => {
  try {
    const params = {
      limite,
      desde,
      sortBy,
      order,
    };

    if (course) {
      params.course = course;
    }

    const { data } = await apiClient.get("/publication", { params });

    return data;
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
};

export const getPublicationsById = async (id) => {
  try {
        const response = await apiClient.get(`/publication/${id}`);
        return response.data;
  } catch (e) {
    return { 
        error: true, 
        e 
    };
  }
};

export const getCommentsByPublication = async (publicationId) => {
  try {
    const response = await apiClient.get(`/comments/publication/${publicationId}`);
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

export const createComment = async (data) => {
  try {
    const response = await apiClient.post("/comments", data);
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};