import axios from 'axios'

console.log('env', process.env.NODE_ENV)
axios.defaults.headers.post.Accept = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.VITE_API_URI || ''

export default axios
