import { reactive } from 'vue'
import axios from 'axios'
import config from '@/state/config'
import { account } from '@/state/account'

const verifyInfo = reactive<{
  eth: any;
  dot: any;
  twitter: any;
  [index: string]: any;
}>({
  eth: null,
  dot: null,
  twitter: null
})

export const getVerifyInfo = async () => {
  const res: any = await axios.post(config.verifyUrl as string, { domain: account.currDomain })
  console.log(res)
  if (res.data.result === 'ok') {
    verifyInfo.eth = res.data.data.eth
    verifyInfo.dot = res.data.data.dot
    verifyInfo.twitter = res.data.data.twitter
  }
}

export default verifyInfo
