import axios from 'axios';

export const apiSubjects = axios.create({
    baseURL: `http://evening-tor-20872.herokuapp.com`,
});
