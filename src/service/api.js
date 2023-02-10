import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common.utils';

// const API_URL = 'https://cms-backend-gy29.onrender.com';
const API_URL = "http://localhost:5000"

const axiosInstance = axios.create({
    baseURL : API_URL,
    timeout: 10000
});

axiosInstance.interceptors.request.use(
    function(config){
        if (config.TYPE.params) {
            config.params = config.TYPE.params;    
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response) {
        // stop global loader here
        return processResponse(response);
    },
    function (error) {
        // to show the rejected error msg
        return Promise.reject(processError(error));

    }
)

const processResponse = (response) => {
    if(response?.status === 200 || response?.status === 201 ) {
        return { isSuccess: true, data: response.data}
    } else {
        return { isFailure: true, status: response?.status, msg: response?.msg, code:response?.code}
    }
} 

const processError = (error) => {
    if(error.response) {
        // Request made and server responded with a status other
        // that falls out of the range 2.x.x
        console.log('ERROR IN RESPONSE:' , error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }else if(error.request) {
        // Request made but no response was received
        console.log('ERROR IN REQUEST:' , error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ''
        }
    } else {
        //Something happened in setting up request that triggers an error
        console.log('ERROR IN NETWORK:' , error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ''
        }
    }
}

const API = {};

for (const [key,value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => 
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },
            TYPE: getType(value, body),
            onUploadProgress: function() {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function() {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
    
}

export { API };