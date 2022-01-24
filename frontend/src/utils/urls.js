export const BASE_URL = 'http://localhost:8080';
//const BASE_URL = 'https://kh-final-thek.herokuapp.com';

export const API_URL = (slug) => `${BASE_URL}/${slug}`;
//export const API_URL = (slug) => `http://localhost:8080/signup`;

export const PERSONAL_URL = (memberId)=> `http://localhost:8080/member/${memberId}`