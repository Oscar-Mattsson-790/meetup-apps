export async function getMeetups() {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/meetups`, {
      method: "GET",
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching meetups:", error);
    throw error;
  }
}

export async function getLogin(username, password) {
  const data = {
    userName: username,
    password: password,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/user/login`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
