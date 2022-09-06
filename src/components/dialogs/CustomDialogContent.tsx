import { TextField, Autocomplete } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

export type InputType = 'text' | 'select'

export interface CustomDialogContentProps {
	label: string
	type: InputType
	onChange?: (val: any) => void
	required?: boolean
	rule?: (val: any) => boolean
	options?: any[]
}

const CustomDialogContent = (props: CustomDialogContentProps) => {
	const {
		label,
		type,
		onChange = () => {},
		required = false,
		rule = () => {},
		options = [],
	} = props

	const [val, setVal] = useState('')

	const [helperText, setHelperText] = useState('')

	useEffect(() => {
		required && val.trim() === '' && setHelperText('不能为空')

		onChange(val.trim())
	}, [val])

	const selectRender = useMemo(
		() => ({
			text: (
				<TextField
					size="small"
					label={label + `${required ? '*' : ''}`.trim()}
					helperText={helperText}
					onChange={(e) => setVal(e.target.value)}
				/>
			),
			select: (
				<Autocomplete
					renderInput={(params) => (
						<TextField
							{...params}
							size="small"
							label={label}
							onChange={(e) => setVal(e.target.value)}
						/>
					)}
					options={options}
				/>
			),
		}),
		[]
	)

	return selectRender[type]
}

export default CustomDialogContent

const valIsEmpty = (val: string) => val.trim() === ''
