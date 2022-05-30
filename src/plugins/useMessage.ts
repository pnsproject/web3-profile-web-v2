export type MsgType = 'info' | 'success' | 'warn' | 'error'

const useMessage = function (type: MsgType = 'info', msg: string, emoji?: string, dark?:boolean) {
  let messageList = document.getElementById('MessageList')
  if (!messageList) {
    messageList = document.createElement('div')
    messageList.setAttribute('id', 'MessageList')
    document.body.append(messageList)
  }

  messageList.setAttribute('class', dark ? 'dark' : '')

  const messageItem = document.createElement('div')
  const className = `app-message ${type}`
  messageItem.setAttribute('class', className)

  if (emoji) {
    const icon = document.createElement('span')
    icon.setAttribute('class', 'icon')
    icon.innerText = emoji
    messageItem.append(icon)
  } else {
    const icon = document.createElement('img')
    icon.setAttribute('src', `/message/${type}.svg`)
    icon.setAttribute('class', 'icon')
    messageItem.append(icon)
  }

  const textItem = document.createElement('div')
  textItem.setAttribute('class', 'text')
  textItem.innerText = msg

  if (Math.min(screen.width, window.innerWidth) <= 750) {
    messageItem.style.maxWidth = '260px'
  }

  const messageItemList = messageList.querySelectorAll('.app-message')
  messageItem.appendChild(textItem)
  messageList.append(messageItem)
  if (messageItemList.length) {
    messageItemList.forEach((item, index) => {
      (item as any).style.top = Number((item as any).style.top.replace('px', '')) + messageItem.clientHeight + 12 + 'px'
    })
  }
  setTimeout(() => {
    messageItem.setAttribute('class', `app-message active ${type}`)
    setTimeout(() => {
      messageItem.setAttribute('class', `app-message ${type}`)
      setTimeout(() => {
        messageItem.remove()
      }, 500)
    }, 3000)
  }, 100)
}

export default useMessage
