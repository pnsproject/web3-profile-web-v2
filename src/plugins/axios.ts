import axios from 'axios'
import config from '@/state/config'

console.log('env', process.env.NODE_ENV)
axios.defaults.headers.post.Accept = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = config.apiUrl as string

export default axios
