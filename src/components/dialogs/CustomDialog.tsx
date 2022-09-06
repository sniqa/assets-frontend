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

export type { CustomDialogContentProps }

interface CustomDialogProps {
	title: string
	open: boolean
	onClose: () => void
	contents: CustomDialogContentProps[]
	onOk?: (val: any) => void
}

const CustomDialog = (props: CustomDialogProps) => {
	const { title, open, onClose, onOk = () => {}, contents } = props

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>

			<DialogContent className={`w-32rem p-4 flex flex-wrap`}>
				{contents.map((content) => (
					<div className="w-1/2 p-2" key={content.label}>
						<CustomDialogContent {...content} />
					</div>
				))}
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose}>{`取消`}</Button>
				<Button
					variant="contained"
					disableElevation
					// onClick={() => onOk(value)}
				>{`确定`}</Button>
			</DialogActions>
		</Dialog>
	)
}

export default CustomDialog
