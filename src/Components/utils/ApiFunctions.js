import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:8080",
});
export const getHeaders = () => {
  const token = localStorage.getItem("scholarToken");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
export async function addArticle(article, file) {
  try {
    const token = localStorage.getItem("scholarToken");
    const userId = localStorage.getItem("scholarId");
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("userEmail", userId);
    formData.append("authorName", article.authorName);
    formData.append("authorEmail", article.authorEmail);
    formData.append("uploadDate", article.uploadDate);
    formData.append("file", file);
    const response = await api.post("/journal/addJournal", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (e) {
    return new Error(e.message);
  }
}
export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function registerUser(registration) {
  try {
    const response = await api.post("/auth/register", registration);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function findUserByEmail(email) {
  try {
    const response = await api.get(`/user/findByEmail/${email}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function updateUserDetails(user) {
  try {
    const userEmail = localStorage.getItem("scholarId");
    const response = await api.put(`/user/updateUser/${userEmail}`, user, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (e) {
    throw new Error(error.message);
  }
}
export async function searchArticle(title) {
  try {
    const response = await api.get(
      `/journal/searchJournal/${title}?status=ACCEPTED`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function displayArticle(articleId) {
  try {
    const response = await api.get(`/journal/displayJournal/${articleId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function downloadArticle(articleId) {
  try {
    const response = await api.get(`/journal/downloadPdf/${articleId}`, {
      headers: getHeaders(),
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function listOfUserArticles() {
  try {
    const userEmail = localStorage.getItem("scholarId");
    const response = await api.get(
      `/journal/findAllJournalByEmail/${userEmail}`,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getAllUsers() {
  try {
    const response = await api.get("/user/allUsers", {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getAllArticles() {
  try {
    const response = await api.get("/journal/allJournals", {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function deleteArticle(articleId) {
  try {
    const response = await api.delete(
      `/journal/deleteJournalById/${articleId}`,
      {
        headers: getHeaders(),
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function updateArticleStatus(articleId, status) {
  try {
    const response = await api.patch(
      `/journal/updateJournalStatus/${articleId}?status=${status}`,
      null,
      {
        headers: getHeaders(),
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
