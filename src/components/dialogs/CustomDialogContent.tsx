import {
	TextField,
	Autocomplete,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

export type InputType = 'text' | 'select' | 'autoComplete'

export interface CustomDialogContentProps {
	label: string
	type: InputType
	onChange?: (val: any) => void
	required?: boolean
	rule?: (val: any) => boolean
	options?: any[]
	disabled?: boolean
}

const CustomDialogContent = (props: CustomDialogContentProps) => {
	const {
		label,
		type,
		onChange = () => {},
		required = false,
		rule = () => {},
		options = [],
		disabled = false,
	} = props

	// const [val, setVal] = useState("");

	const [helperText, setHelperText] = useState('')

	const selectRender = useMemo(
		() => ({
			text: (
				<TextField
					error={helperText != ''}
					disabled={disabled}
					size="small"
					label={label + `${required ? '*' : ''}`.trim()}
					helperText={helperText}
					onChange={(e) => {
						const value = e.target.value

						if (required) {
							if (value.trim() === '') {
								setHelperText('不能为空')
							} else {
								setHelperText('')
								// setVal(value);
								onChange(value)
							}
						}

						onChange(value)
					}}
				/>
			),
			select: (
				<FormControl fullWidth size={`small`} disabled={disabled}>
					<InputLabel>{label}</InputLabel>
					<Select
						label={label}
						defaultValue={''}
						onChange={(e) => onChange(e.target.value)}
						autoFocus
						size="small"
					>
						{options.map((option) => (
							<MenuItem key={option} value={option}>
								{option || ''}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			),
			autoComplete: (
				<Autocomplete
					disabled={disabled}
					renderInput={(params) => (
						<TextField
							{...params}
							size="small"
							label={label}
							onChange={(e) => onChange(e.target.value)}
						/>
					)}
					options={options}
				/>
			),
		}),
		[helperText]
	)

	return selectRender[type]
}

export default CustomDialogContent

const valIsEmpty = (val: string) => val.trim() === ''
