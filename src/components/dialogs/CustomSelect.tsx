import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectProps,
} from '@mui/material'

export type CustomSelectProps = SelectProps & {
	// label: string
	onChange?: (val: any) => void
	// required?: boolean
	// rule?: (val: any) => boolean
	options?: any[]
	// defaultValue?: string
	// value?: string
	// disabled?: boolean
}

const CustomSelect = ({
	label,
	onChange = () => {},
	options = [],
	...res
}: // ...res
CustomSelectProps) => {
	return (
		<div className="w-1/2 p-2">
			<FormControl fullWidth size={`small`}>
				<InputLabel>{label}</InputLabel>
				<Select
					label={label}
					{...res}
					onChange={(e) => onChange(e.target.value)}
					size="small"
				>
					{options.map((option, index) => (
						<MenuItem key={index} value={option}>
							{option || ''}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}

export default CustomSelect
