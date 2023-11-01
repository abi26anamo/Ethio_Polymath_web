
// new feedback
const newFeedback = async (data) => {
    try {
        const response = 'Thank you for your feedback'
        return response
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.msg)
        } else {
            throw new Error("An error occurred!")
        }
    }
}




const feedbackService = {
    newFeedback
}

export default feedbackService