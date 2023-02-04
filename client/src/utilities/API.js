import axios from "axios";

const token = () => {
    const idToken = localStorage.getItem('idToken');
    if (!idToken) {
        // returning undefined on token not found
        return;
    }

    return {
        headers: {
            authorization: `Bearer ${idToken}`
        }
    };
};

class API {
    constructor(route) {
        this.serverRouteURL = process.env.REACT_APP_SERVER_BACKEND_API_URL + route;
    }

    /** get api */
    get(extension) {
        const apiURL = this.serverRouteURL + extension;
        return axios.get(apiURL, token());
    }

    /** post api */
    post(extension, data) {
        if (!data) {
            [extension, data] = [data, extension];
        }

        const apiURL = `${this.serverRouteURL}${extension || ''}`;
        return axios.post(apiURL, data, token());
    }

    /** patch api */
    patch(extension, data) {
        const apiURL = this.serverRouteURL + extension;
        return axios.patch(apiURL, data, token());
    }

    /** delete api */
    delete(extension) {
        const apiURL = this.serverRouteURL + extension;
        return axios.delete(apiURL, token());
    }
}

export default API;