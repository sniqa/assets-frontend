import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material"
import { useEffect, useState } from "react"

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
	onEdit?: (value: any) => void
	originData?: Record<string, any>
}

const EditDialog = (props: AddDialogProps) => {
	const {
		open,
		onClose,
		title = "",
		content,
		onEdit = () => {},
		originData = {},
	} = props

	const [value, setValue] = useState(originData)

	useEffect(() => {
		setValue(originData)
	}, [originData])

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>

			<DialogContent>
				<div className="p-2 flex flex-wrap justify-between w-30rem">
					{content &&
						content.map((item) => (
							<TextField
								label={item.required ? item.label + " *" : item.label}
								size="small"
								defaultValue={originData[item.field]}
								key={item.field}
								sx={{ my: "8px" }}
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
					onClick={() => onEdit(value)}
				>{`确定`}</Button>
			</DialogActions>
		</Dialog>
	)
}

export default EditDialog
