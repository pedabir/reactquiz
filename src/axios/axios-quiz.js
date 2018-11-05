import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-f7b59.firebaseio.com/'
})