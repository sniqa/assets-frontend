import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import CustomDialogContent, {
	CustomDialogContentProps,
} from './CustomDialogContent'
import { ReactNode } from 'react'

export type { CustomDialogContentProps }

interface DialogWraperProps {
	title: string
	open: boolean
	onClose: () => void
	onOk?: () => void
	children?: ReactNode
}

const DialogWraper = (props: DialogWraperProps) => {
	const { title, open, onClose, onOk = () => {}, children } = props

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>

			<DialogContent className={`w-32rem p-4 flex flex-wrap`}>
				{children}
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose}>{`取消`}</Button>
				<Button
					variant="contained"
					disableElevation
					onClick={onOk}
				>{`确定`}</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DialogWraper
