import { reactive } from 'vue'
import appConfig from '@/state/config'

interface NftDetailDialog {
  show: boolean
  assetsId: string | null
}

export const nftDetailDialog: NftDetailDialog = reactive({
  show: false,
  assetsId: null
})

export const showDialog = (assetsId: string) => {
  nftDetailDialog.assetsId = assetsId
  const body: any = document.querySelector('body')
  body.style.height = '100vh'
  body.style.overflow = 'hidden'
  body.style.paddingRight = appConfig.scrollBarWidth + 'px'
  nftDetailDialog.show = true
}

export const closeDialog = () => {
  const body: any = document.querySelector('body')
  body.style.height = 'auto'
  body.style.overflow = 'auto'
  body.style.paddingRight = '0'
  nftDetailDialog.show = false
}
