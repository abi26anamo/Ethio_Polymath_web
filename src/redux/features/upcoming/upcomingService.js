const { v4: uuidv4 } = require('uuid')
var upcomings = [
    {
        id: 1,
        title: 'Financial 101',
        content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.'
    },
    {
        id: 2,
        title: 'Financial 102',
        content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.'
    }
]

// get Upcoming
const getUpcoming = async () => {
    try {
        return upcomings
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.msg)
        } else {
            throw new Error("An error occurred!")
        }
    }
}

// create Upcoming
const createUpcoming = async (data) => {
    const items = {
        title: data.title,
        description: data.description
    }

    try {
        const response = [...upcomings]
        return response
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.msg)
        } else {
            throw new Error("An error occurred!")
        }
    }
}

// delete Upcoming
const deleteUpcoming = async (data) => {
    console.log(data)
    const items = {
        message: 'Delete Upcoming'
    }

    try {
        const response = items
        return response
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.msg)
        } else {
            throw new Error("An error occurred!")
        }
    }
}


const upcomingService = {
    getUpcoming,
    createUpcoming,
    deleteUpcoming
}

export default upcomingService