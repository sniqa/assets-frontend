import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import { useState } from 'react'

export interface AddDialogContent {
	label: string
	field: string
	required?: boolean
}

interface AddDialogProps {
	open: boolean
	onClose: () => void
	title: string
	content: AddDialogContent[]
	onAdd?: (value: any) => void
}

const AddDialog = (props: AddDialogProps) => {
	const { open, onClose, title = '', content, onAdd = () => {} } = props

	const [value, setValue] = useState(
		Object.fromEntries(content.map((item) => [item.field, '']))
	)

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle color={`primary`}>{title}</DialogTitle>

			<DialogContent>
				<div className="p-2 flex flex-wrap justify-between w-30rem">
					{content &&
						content.map((item) => (
							<TextField
								label={item.required ? item.label + ' *' : item.label}
								size="small"
								key={item.field}
								sx={{ my: '8px' }}
								onChange={(e) =>
									setValue({ ...value, [item.field]: e.target.value })
								}
							/>
						))}
				</div>
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose}>{`取消`}</Button>
				<Button
					variant="contained"
					onClick={() => onAdd(value)}
				>{`确定`}</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddDialog
