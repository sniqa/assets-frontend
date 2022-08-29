import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material'
import { useState } from 'react'
import { emitter } from '../../apis/mitt'
import { useAppDispatch, useAppSelector } from '../../store'
import { ok, cancel } from '../../store/confirm'
import { ConfirmbarState } from '../../types'

const Confirmbar = () => {
	const state = useAppSelector((state) => state.confirm)

	const dispatch = useAppDispatch()

	const [confirm, setConfirm] = useState<ConfirmbarState>({
		title: '',
		message: '',
	})

	emitter.on('confirm', (state) => {
		dispatch(ok())
		setConfirm(state)
	})

	return (
		<Dialog open={state} onClose={() => dispatch(cancel())}>
			<DialogTitle color={`primary`}>{confirm.title}</DialogTitle>

			<DialogContent>
				<div className="min-w-16rem">{confirm.message}</div>
			</DialogContent>

			<DialogActions>
				<Button
					onClick={() => (
						emitter.emit('confirmResult', false), dispatch(cancel())
					)}
				>{`取消`}</Button>
				<Button
					variant="contained"
					onClick={() => (
						emitter.emit('confirmResult', true), dispatch(cancel())
					)}
					disableElevation
				>{`确定`}</Button>
			</DialogActions>
		</Dialog>
	)
}

export default Confirmbar
