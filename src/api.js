import axios from "axios";
// axios.defaults.baseURL = 'http://localhost:3001/api'
// axios.defaults.proxy.port = '3001';
// axios.defaults.baseURL = 'http://127.0.0.1:3001';
// axios.defaults.withCredentials = true;

let api = {
    login(username, password, remember_me, handler, error_handler) {
        console.log('wtf', remember_me)
        axios.post('/api/auth/login', {
            username,
            password,
            remember_me
        })
            .then(handler)
            .catch(error_handler)
    },
    current(handler) {
        axios.get('/api/auth/current')
            .then(handler)
            .catch(() => { })
    },
    logout() {
        axios.delete('/api/auth/logout')
    },
    register(username, password, email, captcha, handler, error_handler) {
        axios.post('/api/user', {
            username,
            password,
            email,
            captcha
        })
            .then(handler)
            .catch(error_handler)
    },
    captcha(handler) {
        axios.post('/api/captcha')
            .then(handler)
            .catch(() => { })
    },
    user(username, handler) {
        axios.get(`/api/user/${username}`)
            .then(handler)
            .catch(() => { })
    },
    upload_image(file, handler) {
        axios.post('/api/image', file, {
            'headers': {
                "Content-type": "multipart/form-data"
            }
        })
            .then(handler)
            .catch(() => { })
    }
}

export default api;