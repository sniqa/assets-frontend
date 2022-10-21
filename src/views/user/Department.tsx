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
import { useAppDispatch, useAppSelector } from '../../store'
import {
	addDepartment,
	deleteManyDepartment,
	setDepartments,
	updateDepartment,
} from '../../store/department'

const columns: TableColumn[] = [
	{ label: '部门', field: 'department_name' },
	{ label: '办公室', field: 'locations' },
]

const Department = () => {
	const departmentRows = useAppSelector((state) => state.department)

	const dispatch = useAppDispatch()

	const [openDialog, setOpenDialog] = useState(false)

	const [openEditDialog, setOpenEditDialog] = useState(false)

	const [departmentInfo, setDepartmentInfo] = useState<
		TableRow<DepartmentInfo>
	>({
		_id: '',
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

	const [selectRow, setSelectRow] = useState<TableRow<DepartmentInfo>>({
		_id: '',
		department_name: '',
		locations: [''],
	})

	// 创建
	const createDepartment = async (info: DepartmentInfo) => {
		const { create_department } = await _fetch({ create_department: info })

		if (create_department) {
			const { success, data, errmsg } = create_department

			return success
				? (dispatch(addDepartment({ ...info, ...data })),
				  notice({
						status: 'success',
						message: '创建成功',
				  }),
				  setOpenDialog(false))
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
	const handlerUpdateDepartment = async () => {
		const { modify_department } = await _fetch({
			modify_department: departmentInfo,
		})

		if (modify_department) {
			const { success, data, errmsg } = modify_department

			return success
				? (dispatch(updateDepartment(departmentInfo)),
				  notice({ status: 'success', message: '修改成功' }))
				: notice({
						status: 'error',
						message: errmsg,
				  })
		}

		return notice({
			status: 'error',
			message: `更新失败`,
		})
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

		const { delete_department } = await _fetch({ delete_department: [ids] })

		if (delete_department) {
			const { success, data, errmsg } = delete_department

			return success
				? (dispatch(deleteManyDepartment(ids)),
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

	return (
		<AnimateWraper className="w-full">
			<Table
				columns={columns}
				rows={departmentRows}
				extensions={extensions}
				operate={operate}
				onDeleteSelection={(ids) => deleteDepartment(ids)}
			/>

			{openDialog && (
				<TableDialog
					open={openDialog}
					onClose={() => setOpenDialog(!openDialog)}
					title={'新建部门'}
					content={<DialogContent onChange={(val) => setDepartmentInfo(val)} />}
					onClick={() => createDepartment(departmentInfo)}
				/>
			)}

			{openEditDialog && (
				<TableDialog
					open={openEditDialog}
					onClose={() => setOpenEditDialog(false)}
					title={`编辑`}
					content={
						<DialogContent
							originDate={selectRow}
							onChange={(val) => setDepartmentInfo(val)}
						/>
					}
					onClick={() => (handlerUpdateDepartment(), setOpenEditDialog(false))}
				/>
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
	onChange?: (val: TableRow<DepartmentInfo>) => void
	originDate?: TableRow<DepartmentInfo>
}

const DialogContent = ({
	onChange = () => {},
	originDate = {
		department_name: '',
		locations: [''],
		_id: '',
	},
}: DialogContentProps) => {
	const [departmentInfo, setDepartmentInfo] = useState(originDate)

	useEffect(() => {
		onChange(departmentInfo as any)
	}, [departmentInfo])

	return (
		<div className="py-2">
			<TextField
				size="small"
				label={`部门名称`}
				value={departmentInfo.department_name || ''}
				onChange={(e) => {
					setDepartmentInfo({
						...departmentInfo,
						department_name: e.target.value,
					})
				}}
			/>

			<DynamicInput
				label="办公室"
				value={departmentInfo.locations || ['']}
				onChange={(val) => {
					setDepartmentInfo({
						...departmentInfo,
						locations: val,
					})
				}}
			/>
		</div>
	)
}

interface DynamicInputProps {
	label: string
	onChange?: (data: string[]) => void
	value?: string[]
}

const DynamicInput = (props: DynamicInputProps) => {
	const { label, onChange = () => {}, value = [''] } = props

	const [inputVals, setInputVals] = useState<Array<string>>(value)
	const [inputKeys, setInputKeys] = useState(createUuidString(value.length))

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
						value={inputVals[index]}
						onChange={(e) => {
							setInputVals((olds) => {
								return olds.map((old, idx) =>
									idx === index ? e.target.value : old
								)
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
									setInputKeys((olds) => {
										return olds.filter((old, idx) => idx != index)
									})
									setInputVals((olds) => {
										return olds.filter((old, idx) => idx != index)
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

const createUuidString = (length: number) => {
	const temp: string[] = []
	for (let i = 0; i < length; i++) {
		temp.push(nanoid())
	}

	return temp
}
