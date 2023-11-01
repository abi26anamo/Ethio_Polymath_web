import Cookies from "js-cookie";

export const setSessionCookie = (session) => {
  const existingSessionID = Cookies.get("session");
  if (!existingSessionID) {
    Cookies.set("session", session, {
      path: "/",
      sameSite: "strict",
      secure: true,
      httpOnly: true, // Set HttpOnly attribute
    });
  }
};

export const login = async (email, password, rememberMe) => {
  try {
    const response = await fetch(process.env.SERVER_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (response.ok) {
      const { sessionID } = await response.json();

      setSessionCookie(sessionID);

      Cookies.set("loggedin", true);
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
    //   router.push("/dashboard/video-management");
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (router) => {
  try {
    await fetch(process.env.SERVER_URL + "/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    Cookies.remove("sessionID"); // Remove sessionID cookie
    await fetch(process.env.SERVER_URL + "/clear_session", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    Cookies.remove("connect.sid");
    router.push("/login");
  } catch (error) {
    console.log(error);
  }
};
