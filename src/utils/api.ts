import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class API {

    constructor() {
        console.log('created!');
    }

    public get = (path: string) => {
        return new Promise((resole, reject) => {
            axios.get(path)
                .then(function (response) {
                    console.log(response.data, response.status, response.statusText);
                    response.status === 200 ? resole(response.data) : reject(new Error(response.statusText));
                })
                .catch(function (error) {
                    //console.log(error);
                    reject(error);
                });
        });
    }

    public post = (path: string, data: any) => {
        return new Promise((resole, reject) => {
            axios.post(path, data)
                .then(function (response) {
                    console.log(response.data, response.status, response.statusText);
                    response.status === 200 ? resole(response.data) : reject(new Error(response.statusText));
                })
                .catch(function (error) {
                   
                    reject(error);
                });
        })
    }

    public apiUrl = process.env.REACT_APP_API_URL;

}
export default new API();