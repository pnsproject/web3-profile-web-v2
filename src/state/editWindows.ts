import { reactive } from 'vue'

export interface EditWindows {
  show: boolean,
  editType: string,
  option: any
}

export const editWindows: EditWindows = reactive({
  show: false,
  editType: '',
  option: null
})

export const showWindow = function (editType: string, option:{title:string, data: any}) {
  editWindows.editType = editType
  editWindows.show = true
  editWindows.option = option
}

export const closeWindow = function () {
  editWindows.show = false
}
