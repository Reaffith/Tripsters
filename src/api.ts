const BASE_URL = "http://localhost:8088";

async function fetchData(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
    mode: 'cors',
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

type LoginData = {
  email: string;
  password: string;
};

export async function logIn(data: LoginData) {
  await fetchData("auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    localStorage.removeItem("authToken");

    if (response) {
      localStorage.setItem("authToken", response.token);
    }

    console.log("localstorage", localStorage.getItem("authToken"));
  });
}

type RegUser = {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
};

export async function registerUser(data: RegUser): Promise<number | void> {
  try {
    const response = await fetch("http://localhost:8088/auth/registration", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(response.json())

    if (!response.ok) {
      return response.status;
    } else {
      logIn({
        email: data.email,
        password: data.password,
      })
    }

    return response.status;
  } catch (error) {
    console.error(error);
  }
}
