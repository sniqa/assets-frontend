import { Alert, AlertColor, Snackbar, SnackbarCloseReason } from '@mui/material'
import { useState } from 'react'
import { emitter } from '../../apis/mitt'
import { useAppDispatch, useAppSelector } from '../../store'
import { notice, removeNotice } from '../../store/notice'
import { NoticebarStatus } from '../../types'

// export interface NoticebarStatus {
// 	status: AlertColor
// 	message: string
// 	onClose?: (
// 		event: Event | React.SyntheticEvent<any, Event>,
// 		reason: SnackbarCloseReason
// 	) => void
// }

const Noticebar = () => {
	// const { status, message } = useAppSelector((state) => state.notice)

	// const dispatch = useAppDispatch()

	// emitter.on('notice', (state) => {
	// 	dispatch(notice(state))
	// })

	const [alertMsg, setAlertMsg] = useState<NoticebarStatus>({
		status: 'success',
		message: '',
	})

	emitter.on('notice', (state) => {
		setAlertMsg(state)
	})

	return (
		// <Snackbar
		// 	open={message != ''}
		// 	autoHideDuration={3000}
		// 	onClose={() => dispatch(removeNotice())}
		// 	message={message}
		// 	anchorOrigin={{
		// 		vertical: 'top',
		// 		horizontal: 'center',
		// 	}}
		// >
		// 	<Alert severity={status} sx={{ width: '100%' }}>
		// 		{message}
		// 	</Alert>
		// </Snackbar>
		<Snackbar
			open={alertMsg.message != ''}
			autoHideDuration={3000}
			onClose={() => setAlertMsg({ status: 'success', message: '' })}
			message={alertMsg.message}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<Alert severity={alertMsg.status} sx={{ width: '100%' }}>
				{alertMsg.message}
			</Alert>
		</Snackbar>
	)
}

export default Noticebar
