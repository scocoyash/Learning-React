import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-yash.firebaseio.com/'
});

export default instance;