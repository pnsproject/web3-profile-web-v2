import useMessage from '@/plugins/useMessage'
// interface Icons {
//   facebook:any
//   twitter:any
//   mail:any
//   telegram:any
//   copy:any
// }

interface Methods {
  [key: string]: any
}

const methods: Methods = {
  facebook: () => {
    window.open(`https://www.facebook.com/sharer.php?u=${window.location.host}`)
  },
  twitter: () => {
    const messageText = encodeURIComponent('This is my Web3 profile!')
    const address = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${messageText}&url=${address}`)
  },
  mail: () => {
    window.open(`mailto:?subject=This is my Web3 profile&body=This is my Web3 profile! ${window.location.href}`)
  },
  telegram: () => {
    const address = encodeURIComponent(window.location.href)
    window.open(`https://telegram.me/share/?url=${address}`)
  },
  copy: () => {
    const oInput = document.createElement('input')
    oInput.value = window.location.href
    document.body.appendChild(oInput)
    oInput.select()
    document.execCommand('Copy')
    oInput.id = 'oInput'
    oInput.style.display = 'none'
    document.querySelector('#oInput')?.remove()
    useMessage('success', 'Copy success!')
  }
}

export default methods
