import axios from "axios";
// register user
const register = async (userData) => {
    try {
      const { email, password, confirmPassword } = userData;
  
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
  
      const response = await axios.post(
        process.env.APP_URL + 'register',
        {
          email,
          password,
          confirmPassword,
        }
        );
  
      if (response.status === 200) {
        const registeredUserData = response.data;
  
        localStorage.setItem("user", JSON.stringify(registeredUserData));
  
        return registeredUserData;
      } 
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }




// login user
const login = async (email, password) => {

    const response = await fetch(process.env.APP_URL + 'login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

    if(response.ok) {  
        const user  = await response.json();
        localStorage.setItem('user', JSON.stringify(user))
        console.log(user)
        return user
        
          
    }

}

// logout user
const logout = async () => {
  const response = await fetch(process.env.APP_URL + 'logout', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

  if(response.ok) {  
      localStorage.removeItem('user') 
  }
  

  return
}

// update user
const update = async (data) => {
    console.log("UPDATE")
    return true
    // const token = JSON.parse(localStorage.getItem('user'))['token']
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };
    // const response = await axios.post(API_URL + 'me/update', userData, config)
    // if(response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // } 
    // return response.data
}

// get user
const getUser = (user) => {

    const data = {
        user: 'test',
        id: 'testid-02',
        verified: true
    }

    return user?.id ? data : null
}


const authService = {
    login,
    logout,
    update,
    getUser,
    register
}

export default authService