import axios from 'axios'

console.log('env', process.env.NODE_ENV)
axios.defaults.headers.post.Accept = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
// const env = process.env.NODE_ENV === 'development' ? 'https://web3profile-api.test-pns-link.com' : 'https://api-rpc.pns.link'
const env = process.env.NODE_ENV === 'development' ? 'https://web3profile-api.test-pns-link.com' : 'https://web3profile-api.test-pns-link.com'
axios.defaults.baseURL = env

export default axios
