import {
	Button,
	IconButton,
	TextField,
	TextFieldProps,
	Tooltip,
} from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { _fetch } from '../../apis/fetch'
import {
	AddCircleOutlineIcon,
	AddIcon,
	DeleteIcon,
} from '../../components/icons'
import Table, {
	TableDialog,
	TableToolbarExtensions,
	Operate,
	TableColumn,
	TableRow,
} from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'

import { nanoid } from 'nanoid'
import { notice } from '../../store/notice'

const columns: TableColumn[] = [
	{ label: '部门', field: 'department' },
	{ label: '办公室', field: 'location' },
]

const Department = () => {
	const [openDialog, setOpenDialog] = useState(false)

	const [departmentRows, setDepartmentRows] = useState<TableRow[]>([])

	const [departmentInfo, setDepartmentInfo] = useState({
		department_name: '',
		locations: [''],
	})

	const extensions: TableToolbarExtensions = useMemo(() => {
		return [
			{
				title: '新增部门',
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

	// 创建
	const createDepartment = async (info: DepartmentInfo) => {
		const { CREATE_DEPARTMENT } = await _fetch({ CREATE_DEPARTMENT: info })

		if (CREATE_DEPARTMENT) {
			const { success, data, errmsg } = CREATE_DEPARTMENT

			return success
				? (setDepartmentRows([{ ...info, _id: data }, ...departmentRows]),
				  notice({
						status: 'success',
						message: '创建成功',
				  }))
				: notice({
						status: 'error',
						message: errmsg,
				  })
		}

		return notice({
			status: 'error',
			message: '创建失败',
		})
	}

	useEffect(() => {
		notice({
			status: 'error',
			message: '显示信息',
		})
	}, [])

	// 更新
	const updateDepartment = async () => {}

	//删除
	const deleteDepartment = async () => {}

	// 初始化

	useEffect(() => {
		const getDepartment = async () => {
			const { FIND_DEPARTMENTS } = await _fetch({ FIND_DEPARTMENTS: {} })

			if (FIND_DEPARTMENTS) {
				const { success, data } = FIND_DEPARTMENTS

				return success && setDepartmentRows(data)
			}

			return []
		}

		getDepartment()
	}, [])

	return (
		<AnimateWraper className="w-full">
			<Table
				columns={columns}
				rows={departmentRows}
				extensions={extensions}
				operate={operate}
			/>

			{openDialog ? (
				<TableDialog
					open={openDialog}
					onClose={() => setOpenDialog(!openDialog)}
					title={'新建部门'}
					content={<DialogContent onChange={(val) => setDepartmentInfo(val)} />}
					onClick={() => createDepartment(departmentInfo)}
				/>
			) : (
				<></>
			)}
		</AnimateWraper>
	)
}

export default Department

interface DepartmentInfo {
	department_name: string
	locations: string[]
}

interface DialogContentProps {
	onChange?: (val: DepartmentInfo) => void
}

const DialogContent = ({ onChange = () => {} }: DialogContentProps) => {
	const [departmentInfo, setDepartmentInfo] = useState({
		department_name: '',
		locations: [''],
	})

	return (
		<div className="py-2">
			<TextField
				size="small"
				label={`部门名称`}
				onChange={(e) => {
					setDepartmentInfo({
						...departmentInfo,
						department_name: e.target.value,
					})
					onChange(departmentInfo)
				}}
			/>

			<DynamicInput
				label="办公室"
				onChange={(val) => {
					setDepartmentInfo({
						...departmentInfo,
						locations: val,
					})
					onChange(departmentInfo)
				}}
			/>
		</div>
	)
}

interface DynamicInputProps {
	label: string
	onChange?: (data: string[]) => void
}

const DynamicInput = (props: DynamicInputProps) => {
	const { label, onChange = () => {} } = props

	const [inputVals, setInputVals] = useState<Array<string>>([''])
	const [inputKeys, setInputKeys] = useState([nanoid(6)])

	useEffect(() => {
		onChange(inputVals)
	}, [inputVals])

	return (
		<div className="py-2">
			{inputKeys.map((inputKey, index) => (
				<div key={inputKey} className="py-2">
					<TextField
						size="small"
						label={label + (index + 1)}
						onChange={(e) => {
							setInputVals((old) => {
								old[index] = e.target.value
								return [...old]
							})
						}}
					/>

					{inputKeys.length - 1 === index ? (
						<Tooltip title="增加" placement="right">
							<IconButton
								size="small"
								onClick={() => (
									setInputKeys((old) => [...old, nanoid(6)]),
									setInputVals((old) => [...old, ''])
								)}
							>
								<AddCircleOutlineIcon color="primary" />
							</IconButton>
						</Tooltip>
					) : (
						<Tooltip title="删除" placement="right">
							<IconButton
								onClick={() => {
									setInputKeys((old) => {
										old.splice(index, 1)
										return [...old]
									})
									setInputVals((old) => {
										old.splice(index, 1)
										return [...old]
									})
								}}
								size="small"
							>
								<DeleteIcon color="primary" />
							</IconButton>
						</Tooltip>
					)}
				</div>
			))}
		</div>
	)
}
