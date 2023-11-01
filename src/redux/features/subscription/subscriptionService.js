
// create subscription
const createSuscription = async (data) => {
    try {
        const response = 'subscription Added'
        return response
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.msg)
        } else {
            throw new Error("An error occurred!")
        }
    }
}

// create product
const createProduct = async (data) => {
    console.log(data)
    try {
        const response = 'Product Added'
        return response
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.msg)
        } else {
            throw new Error("An error occurred!")
        }
    }
}

// get archived
const getArchivedList = async () => {
    const response = [
        {
            title: '1 Month Premium Subscription',
            text: 'every month',
            price: '88'
        },
        {
            title: '6 Month Premium Subscription',
            text: 'every 6 month',
            price: '480'
        },
        {
            title: '1 year Premium Subscription',
            text: 'every month',
            price: '800'
        },
        {
            title: 'Lifetime Premium Subscription',
            text: 'lifetime',
            price: '1888'
        }
    ]
    try {
        return response
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.msg)
        } else {
            throw new Error("An error occurred!")
        }
    }
}

// delete archived list
const deleteArchivedList = async (data) => {
    const response = 'Unarchived list'
    try {
        return response
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.msg)
        } else {
            throw new Error("An error occurred!")
        }
    }
}

// subscription Setting
const subscriptionSetting = async (data) => {
    console.log(data)
    const response = 'Subscription settings changed'
    try {
        return response
    } catch (error) {
        if (error.response.status === 404) {
            throw new Error(error.response.data.msg)
        } else {
            throw new Error("An error occurred!")
        }
    }
}






const subscriptionService = {
    createSuscription,
    createProduct,
    getArchivedList,
    deleteArchivedList,
    subscriptionSetting
}

export default subscriptionService