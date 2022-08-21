import {
	Button,
	IconButton,
	TextField,
	TextFieldProps,
	Tooltip,
} from '@mui/material'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import {
	AddCircleOutlineIcon,
	AddIcon,
	DeleteIcon,
} from '../../components/icons'
import Table, {
	TableDialog,
	TableToolbarExtensions,
} from '../../components/table'
import { Operate, TableColumn } from '../../components/table/types'
import AnimateWraper from '../../components/transition/AnimateWraper'

const columns: TableColumn[] = [
	{ label: '部门', field: 'department' },
	{ label: '办公室', field: 'location' },
]

const Department = () => {
	const [openDialog, setOpenDialog] = useState(false)

	const [locations, setLocations] = useState([''])

	const extensions: TableToolbarExtensions = useMemo(() => {
		return [
			{
				title: '新增用户',
				icon: <AddIcon color="primary" />,
				onClick: () => setOpenDialog(!openDialog),
			},
		]
	}, [])

	// 操作栏
	const operate = useMemo<Operate>(
		() => ({
			header: '操作',
			cell: (value) => (
				<Button
					onClick={() => {
						setOpenDialog(true)
					}}
				>{`编辑`}</Button>
			),
		}),
		[]
	)

	return (
		<AnimateWraper className="w-full">
			<Table
				columns={columns}
				rows={[]}
				extensions={extensions}
				operate={operate}
			/>

			<TableDialog
				open={openDialog}
				onClose={() => setOpenDialog(!openDialog)}
				title={'新建部门'}
				content={
					<DialogContent
						label={'办公室'}
						values={locations}
						setValues={setLocations}
					/>
				}
				onClick={() => console.log(locations)}
			/>
		</AnimateWraper>
	)
}

export default Department

interface DynamicInputProps {
	label: string
	values: string[]
	setValues: Dispatch<SetStateAction<string[]>>
}

const DynamicInput = (props: DynamicInputProps) => {
	const { values, label, setValues } = props

	const length = values.length

	return (
		<>
			{values.map((val, index) => (
				<div className="flex items-center py-2" key={val + index}>
					<CustomInput
						label={`${label + (index + 1)}`}
						size="small"
						value={val}
						onChange={(val) =>
							setValues((old) => ((old[index] = val), [...old]))
						}
					/>

					{length - 1 === index ? (
						<Tooltip title="新增">
							<IconButton
								onClick={() => setValues((old) => [...old, ''])}
								sx={{ fontSize: 15 }}
								size="small"
							>
								<AddCircleOutlineIcon color="primary" sx={{ fontSize: 18 }} />
							</IconButton>
						</Tooltip>
					) : (
						<Tooltip title="删除">
							<IconButton
								size="small"
								onClick={() => {
									setValues((old) => values.filter((item, idx) => idx != index))
								}}
							>
								<DeleteIcon color={'error'} sx={{ fontSize: 18 }} />
							</IconButton>
						</Tooltip>
					)}
				</div>
			))}
		</>
	)
}

const DialogContent = (props: DynamicInputProps) => {
	const { label, values, setValues } = props

	return (
		<div className="p-2 flex flex-wrap justify-between w-16.8rem">
			<TextField label={`部门`} size="small" sx={{ pb: '6px' }} />
			<DynamicInput label={label} values={values} setValues={setValues} />
		</div>
	)
}

interface CustomInputProps extends Omit<TextFieldProps, 'onChange'> {
	onChange?: (val: string) => void
}

const CustomInput = (props: CustomInputProps) => {
	const { onChange, value = '', ...prop } = props

	const [val, setValue] = useState(String(value))

	return (
		<TextField
			{...prop}
			value={val}
			onChange={(e) => setValue(e.target.value || '')}
			onBlur={() => onChange && onChange(val)}
		/>
	)
}
