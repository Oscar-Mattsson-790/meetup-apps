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

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getSignup(userDetails) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/user/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserInfo() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/getUserInfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();
    console.log("Vad för result: ", result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function postFeedback(feedbackItem) {
  const data = feedbackItem;

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/feedBack`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteBookedMeetup(name) {
  const data = {
    name: name,
  };

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/deleteBooking`,
      {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function bookMeetup(name) {
  const data = {
    name: name,
  };

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/bookMeetup`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
