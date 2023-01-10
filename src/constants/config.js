export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        message: 'Data is being loaded, please wait'
    },
    success: {
        title: 'Success',
        message: 'Data successfully loadeding loaded'
    },
    responseFailure: {
        title: 'Error',
        message: 'An error occured while fetching response from the server. Please try again'
    },
    requestFailure: {
        title: 'Error',
        message: 'An error occured while parsing request data'
    },
    networkError: {
        title: 'Error',
        message: 'Unable to connect with the server. Please check internet connectivity and try again later'
    }
}

//API SERVICE CALL
//SAMPLE REQUEST
//NEED SERVICE CALL: { url: '/', method: 'POST/GET/PUT/DELETE/' params: true/false, query: true/false}
export const SERVICE_URLS = {
    userSignup: { url: '/api/signUp', method: 'POST'},
    userLogin: { url:'/api/login', method: 'POST' },
    uploadFile: { url: '/api/file/upload', method: 'POST'},
    createPost: { url: '/api/create', method: 'POST'},
    getAllPosts: { url: '/api/posts', method: 'GET', params: true},
    getPostById: { url: '/api/post', method: 'GET', query: true},
    updatePost: { url: '/api/update', method: 'PUT', query: true},
    deletePost: { url: '/api/delete', method: 'DELETE', query: true},
    newComment: { url: '/api/comment/new', method: 'POST'},
    getAllComments: { url: '/api/comments', method: 'GET', query: true},
    deleteComment: { url: '/api/comment/delete', method: 'DELETE', query: true }
}