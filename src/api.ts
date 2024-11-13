const BASE_URL = 'http://localhost:8088';

async function fetchData(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNzI4Mzg5MDA4LCJleHAiOjk5MDAxNzI4Mzg5MDA4fQ.9RtreTOTfI-THar6YC_76mhERvCjIbgmvf-R3Q9DU4Q';

  const headers = new Headers(options.headers || {});
  if (token) {
      headers.append("Authorization", `Bearer ${token}`);
  }

  const config: RequestInit = {
      ...options,
      headers,
  };

  try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, config);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
  } catch (error) {
      console.error("Fetch error:", error);
      throw error;
  }
}
export async function getData(endpoint: string) {
  return await fetchData(endpoint);
}

export async function postData<T>(endpoint: string, data: T) {
  return await fetchData(endpoint, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  });
}

export async function putData<T>(endpoint: string, data: T) {
  return await fetchData(endpoint, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  });
}

export async function deleteData(endpoint: string) {
  return await fetchData(endpoint, { method: "DELETE" });
}
