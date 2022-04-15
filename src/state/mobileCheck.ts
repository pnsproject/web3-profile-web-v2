import { reactive } from 'vue'

export interface Drive {
  isMobile: boolean
}

const checkMobile = () => {
  return Math.min(screen.width, window.innerWidth) <= 954
}

export const drive: Drive = reactive({
  isMobile: checkMobile()
})

window.addEventListener('resize', () => {
  drive.isMobile = checkMobile()
})

window.addEventListener('orientationchange', () => {
  drive.isMobile = checkMobile()
})
