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
import { notice, confirm } from '../../apis/mitt'

const columns: TableColumn[] = [
	{ label: '部门', field: 'department_name' },
	{ label: '办公室', field: 'locations' },
]

const Department = () => {
	const [openDialog, setOpenDialog] = useState(false)

	const [openEditDialog, setOpenEditDialog] = useState(false)

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
					onClick={() => (setSelectRow(value), setOpenEditDialog(true))}
				>{`编辑`}</Button>
			),
		}),
		[]
	)

	const [selectRow, setSelectRow] = useState<TableRow>({
		_id: '',
	})

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

	// 更新
	const updateDepartment = async () => {
		const { MODIFY_DEPARTMENT } = await _fetch({ MODIFY_DEPARTMENT: selectRow })

		console.log(MODIFY_DEPARTMENT)
	}

	//删除
	const deleteDepartment = async (ids: (string | number)[]) => {
		const res = await confirm({
			title: '提示',
			message: '确定删除选中的项目？其他依赖此项的数据将会清空此项数据',
		})

		if (!res) {
			return
		}

		const { DELETE_DEPARTMENT } = await _fetch({ DELETE_DEPARTMENT: [ids] })

		if (DELETE_DEPARTMENT) {
			const { success, data, errmsg } = DELETE_DEPARTMENT

			return success
				? (setDepartmentRows((olds) =>
						olds.filter((old) => !ids.includes(old._id))
				  ),
				  notice({
						status: 'success',
						message: '删除成功',
				  }))
				: notice({
						status: 'error',
						message: errmsg,
				  })
		}

		return notice({
			status: 'error',
			message: '删除失败',
		})
	}

	// 初始化
	useEffect(() => {
		const getDepartment = async () => {
			const { FIND_DEPARTMENT } = await _fetch({ FIND_DEPARTMENT: {} })

			if (FIND_DEPARTMENT) {
				const { success, data, errmsg } = FIND_DEPARTMENT
				return success && setDepartmentRows(data)
			}
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
				onDeleteSelection={(ids) => deleteDepartment(ids)}
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

			{openEditDialog ? (
				<TableDialog
					open={openEditDialog}
					onClose={() => setOpenEditDialog(false)}
					title={`编辑`}
					content={<div></div>}
					onClick={() => updateDepartment()}
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
