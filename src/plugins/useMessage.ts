export type MsgType = 'info' | 'success' | 'warn' | 'error'

const useMessage = function (type: MsgType = 'info', msg: string) {
  let messageList = document.getElementById('MessageList')
  if (!messageList) {
    messageList = document.createElement('div')
    messageList.setAttribute('id', 'MessageList')
    document.body.append(messageList)
  }

  const messageItem = document.createElement('div')
  messageItem.setAttribute('class', `app-message ${type}`)
  const textItem = document.createElement('div')
  textItem.setAttribute('class', 'text')
  textItem.innerText = msg

  const messageItemList = messageList.querySelectorAll('.app-message')
  messageItem.appendChild(textItem)
  messageList.append(messageItem)
  if (messageItemList.length) {
    messageItemList.forEach((item, index) => {
      (item as any).style.bottom = Number((item as any).style.bottom.replace('px', '')) + messageItem.clientHeight + 12 + 'px'
    })
  }
  setTimeout(() => {
    messageItem.setAttribute('class', `app-message active ${type}`)
    setTimeout(() => {
      messageItem.setAttribute('class', `app-message ${type}`)
      setTimeout(() => {
        messageItem.remove()
      }, 500)
    }, 5000)
  }, 100)
}

export default useMessage
