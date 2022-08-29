import mitt, { Emitter } from 'mitt'
import { NoticebarStatus } from '../components/layouts/Noticebar'
import { ConfirmbarState } from '../types'

type MittEvents = {
	notice: NoticebarStatus
	confirm: ConfirmbarState
	confirmResult: boolean
}

export const emitter: Emitter<MittEvents> = mitt<MittEvents>()

export const notice = (state: NoticebarStatus) => {
	emitter.emit('notice', state)
}

export const confirm = (state: ConfirmbarState) => {
	emitter.emit('confirm', state)
	return new Promise((resolve) => {
		emitter.on('confirmResult', (res) => resolve(res))
	})
}
