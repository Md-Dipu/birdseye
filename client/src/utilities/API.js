import axios from "axios";

const axiosConfig = () => {
    const headers = {};
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
        headers.authorization = `Bearer ${localStorage.getItem('idToken')}`;
    }

    return { headers };
};

class API {
    constructor(route) {
        this.serverRouteURL = process.env.REACT_APP_SERVER_BACKEND_API_URL + route;
    }

    /** get api */
    get(extension) {
        const apiURL = this.serverRouteURL + extension;
        return axios.get(apiURL, axiosConfig());
    }

    /** post api */
    post(data) {
        const apiURL = this.serverRouteURL;
        return axios.post(apiURL, data, axiosConfig());
    }

    /** patch api */
    patch(extension, data) {
        const apiURL = this.serverRouteURL + extension;
        return axios.patch(apiURL, data, axiosConfig());
    }

    /** delete api */
    delete(extension) {
        const apiURL = this.serverRouteURL + extension;
        return axios.delete(apiURL, axiosConfig());
    }
}

export default API;