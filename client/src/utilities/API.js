import axios from "axios";

class API {
    constructor(route) {
        this.serverRouteURL = process.env.REACT_APP_SERVER_BACKEND_API_URL + route;
    }

    /** get api */
    get(extension) {
        const apiURL = this.serverRouteURL + extension;
        return axios.get(apiURL);
    }

    /** post api */
    post(data) {
        const apiURL = this.serverRouteURL;
        return axios.post(apiURL, data);
    }

    /** patch api */
    patch(extension, data) {
        const apiURL = this.serverRouteURL + extension;
        return axios.patch(apiURL, data);
    }

    /** delete api */
    delete(extension) {
        const apiURL = this.serverRouteURL + extension;
        return axios.delete(apiURL);
    }
}

export default API;