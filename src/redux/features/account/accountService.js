import axios from "axios";

const updateProfilePicture = async (imageData) => {
    try {
      const response = await axios.post(
        process.env.MOBILE_URL + 'account-setting/profile-picture',
        imageData,
        {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
  
      if (response.status === 200) {
        const registeredUserData = response.data;
  
        return registeredUserData;
      } 
    } catch (error) {
      console.error("Updating profile picture failed:", error);
      throw error;
    }
  }





const updateProfileCover = async (imageData) => {

    try {
        const response = await axios.post(
          process.env.MOBILE_URL + 'account-setting/profile-cover',
          imageData,
          {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
            }
          );
    
        if (response.status === 200) {
          const registeredUserData = response.data;
    
          return registeredUserData;
        } 
      } catch (error) {
        console.error("Updating profile cover failed:", error);
        throw error;
      }

}


const updateCommunityInfo = async (data) => {
  const response = await fetch(process.env.MOBILE_URL + 'community', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

  if(response.ok) {  
    const communityData = await response.json();;  
    return communityData;
  }
  

  return
}


const accountService = {
    updateProfilePicture,
    updateProfileCover,
    updateCommunityInfo
}

export default accountService