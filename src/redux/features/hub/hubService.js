
// Fetch all hubs
const getAllHubs = async () => {
    const response = await fetch(
      process.env.APP_URL + "home/hubs",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch hubs");
      }
      const data = await response.json();

    return data
}

// Fetch single hubs
const getSingleHub = async (id) => {
    const hubs = [
        {
            id: 1,
            title: 'Hub 01',
            content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
            rating: 5
        },
        {
            id: 2,
            title: 'Hub 02',
            content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
            rating: 4
        },
        {
            id: 3,
            title: 'Hub 03',
            content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
            rating: 0
        },
        {
            id: 4,
            title: 'Hub 04',
            content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
            rating: 3
        },
        {
            id: 5,
            title: 'Hub 05',
            content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
            rating: 5
        },
        {
            id: 6,
            title: 'Hub 06',
            content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
            rating: 1
        },
        {
            id: 7,
            title: 'Hub 07',
            content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
            rating: 5
        },
        {
            id: 8,
            title: 'Hub 08',
            content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
            rating: 4
        }
    ]

    const response = hubs.filter(hub => Number(hub.id) === Number(id)).splice(0, 1)[0]

    return response
}

// create hub
const createHub = async (data) => {
    try {
        const response = 'Hub created'
        return response
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.msg)
        } else {
            throw new Error("An error occurred!")
        }
    }

    return response
}




const hubService = {
    getAllHubs,
    getSingleHub,
    createHub
}

export default hubService