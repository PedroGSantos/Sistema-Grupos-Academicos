import axios from 'axios';

export const apiPendencies = axios.create({
    baseURL: `http://pooa-sist-biblioteca.herokuapp.com`,
});
