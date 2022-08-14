import { Alert, AlertColor, Snackbar, SnackbarCloseReason } from '@mui/material'
import { emitter } from '../../apis/mitt'
import { useAppDispatch, useAppSelector } from '../../store'
import { notice, removeNotice } from '../../store/notice'

export interface NoticebarStatus {
	status: AlertColor
	message: string
	onClose?: (
		event: Event | React.SyntheticEvent<any, Event>,
		reason: SnackbarCloseReason
	) => void
}

const Noticebar = () => {
	const { status, message } = useAppSelector((state) => state.notice)

	const dispatch = useAppDispatch()

	emitter.on('notice', (state) => {
		dispatch(notice(state))
	})

	return (
		<Snackbar
			open={message != ''}
			autoHideDuration={3000}
			onClose={() => dispatch(removeNotice())}
			message={message}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<Alert severity={status} sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	)
}

export default Noticebar
