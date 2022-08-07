import { Alert, AlertColor, Snackbar, SnackbarCloseReason } from '@mui/material'
import { useState } from 'react'
// import { emitter } from '../../apis/mitt'

export interface NoticebarStatus {
	status: AlertColor
	message: string
	onClose?: (
		event: Event | React.SyntheticEvent<any, Event>,
		reason: SnackbarCloseReason
	) => void
}

const Noticebar = () => {
	// emitter.on('notice', (state) => {
	// 	setSnackbarStatus(state)
	// })

	const [snackbarStatus, setSnackbarStatus] = useState<NoticebarStatus>({
		status: 'success',
		message: '',
	})

	return (
		<Snackbar
			open={snackbarStatus.message != ''}
			autoHideDuration={3000}
			onClose={() => setSnackbarStatus({ ...snackbarStatus, message: '' })}
			message={snackbarStatus.message}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<Alert severity={snackbarStatus.status} sx={{ width: '100%' }}>
				{snackbarStatus.message}
			</Alert>
		</Snackbar>
	)
}

export default Noticebar
