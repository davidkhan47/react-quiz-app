import axios from "axios";

export default axios.create({
    baseURL : 'https://quiz-app-522c9-default-rtdb.firebaseio.com/'
})