import {post, get} from '../util/marsAxios';

export const getHomeData = params => get('/spaceapi/home', params);

export const saveSurvey = params => post('/spaceapi/survey', params);














