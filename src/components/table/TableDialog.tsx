import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material'

interface TableDialogProps {
	open: boolean
	onClose: () => void
	title: string
	onClick?: () => void
	content?: JSX.Element
}

const TableDialog = (props: TableDialogProps) => {
	const { open, onClose, title, onClick = () => {}, content } = props

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle color={`primary`}>{title}</DialogTitle>

			<DialogContent>{content}</DialogContent>

			<DialogActions>
				<Button onClick={onClose}>{`取消`}</Button>
				<Button
					variant="contained"
					onClick={onClick}
					disableElevation
				>{`确定`}</Button>
			</DialogActions>
		</Dialog>
	)
}

export default TableDialog
