import { Button, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { _fetch } from '../../apis/fetch'
import { notice, confirm } from '../../apis/mitt'

import Table, { TableColumn, TableDialog } from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'

const columns: TableColumn[] = [
	{ label: '时间', field: 'current_time' },
	{ label: '操作人', field: 'who' },
	{ label: '对象', field: 'for_who' },
	{ label: '事件', field: 'event' },
	{ label: '结果', field: 'state' },
	{ label: '信息', field: 'message' },
	{ label: '更新前', field: 'before_update' },
	{ label: '更新后', field: 'after_update' },
]

const Logs = () => {
	const [logs, setLogs] = useState<any[]>([])

	useEffect(() => {
		const getLogs = () =>
			_fetch({ find_logs: {} }).then((res) => {
				const { find_logs } = res
				if (find_logs) {
					const { success, data } = find_logs

					const logData = data.map((d: any) => ({
						...d,
						state: d.state ? '成功' : '失败',
					}))

					success && setLogs(logData)
				}
			})

		getLogs()
	}, [])

	const [openConfirm, setOpenConfirm] = useState(false)

	const [isSure, setIsSure] = useState(false)

	const [openDialog, setOpenDialog] = useState(false)

	const [selectRow, setSelectRow] = useState({})

	const onDeleteSelection = async (info: (string | number)[]) => {
		const res = await confirm({
			title: '提示',
			message: '确定删除选中的日志？',
		})

		if (!res) {
			return
		}

		const { delete_logs } = await _fetch({ delete_logs: [info] })

		if (delete_logs) {
			const { success, data, errmsg } = delete_logs

			return success
				? (setLogs((old) => old.filter((log) => !info.includes(log._id))),
				  notice({ status: 'success', message: '删除成功' }))
				: notice({ status: 'error', message: errmsg })
		}

		return notice({
			status: 'error',
			message: '删除失败, 请重试',
		})
	}

	const operate = useMemo(
		() => ({
			header: '操作',
			cell: (row: any) => (
				<Button onClick={() => (setSelectRow(row), setOpenDialog(true))}>
					{`详情`}
				</Button>
			),
		}),
		[]
	)

	return (
		<AnimateWraper className="w-full">
			<Table
				columns={columns}
				rows={logs}
				operate={operate}
				displayDateTimePicker
				onDeleteSelection={onDeleteSelection}
				dateTimePickerOnChange={(val) => console.log(val)}
			/>

			{openConfirm ? (
				<TableDialog
					open={openConfirm}
					onClose={() => (setOpenConfirm(false), setIsSure(false))}
					onClick={() => (setOpenConfirm(false), setIsSure(true))}
					title={`提示`}
					content={<div className="w-12rem">{`确定删除选定的日志`}</div>}
				/>
			) : (
				<></>
			)}

			{openDialog ? (
				<TableDialog
					open={openDialog}
					onClose={() => setOpenDialog(false)}
					onClick={() => setOpenDialog(false)}
					content={
						<div>
							<LogDetail
								lable="时间"
								value={Reflect.get(selectRow, 'current_time')}
							/>

							<LogDetail lable="操作人" value={Reflect.get(selectRow, 'who')} />

							<LogDetail
								lable="对象"
								value={Reflect.get(selectRow, 'for_who')}
							/>
							<LogDetail lable="事件" value={Reflect.get(selectRow, 'event')} />
							<LogDetail
								lable="结果"
								value={Reflect.get(selectRow, 'state') ? '成功' : '失败'}
							/>
							<LogDetail
								lable="信息"
								value={Reflect.get(selectRow, 'message')}
							/>

							{Reflect.get(selectRow, 'event') === '更新' && (
								<LogDetail
									lable="更新内容"
									value={
										<DisplayUpdateContent
											beforeUpdate={Reflect.get(selectRow, 'before_update')}
											afterUpdate={Reflect.get(selectRow, 'after_update')}
										/>
									}
								/>
							)}
						</div>
					}
					title={`详细`}
				/>
			) : (
				<></>
			)}
		</AnimateWraper>
	)
}

export default Logs

interface LogDetailProps {
	lable: string
	value: string | JSX.Element
}

const LogDetail = ({ lable, value }: LogDetailProps) => {
	return (
		<div className="flex">
			<span className="w-4rem full-length-text  text-blue-500 py-0.5">
				{lable}
			</span>
			<span className="text-blue-500 mr-1rem">:</span>

			<div className="w-25rem  py-0.5">{value}</div>
		</div>
	)
}

interface DisplayUpdateContentProps {
	beforeUpdate: string
	afterUpdate: string
}

const DisplayUpdateContent = ({
	beforeUpdate,
	afterUpdate,
}: DisplayUpdateContentProps) => {
	const itemsAndBeforeVal = beforeUpdate
		.split(';')
		.filter((item) => item.trim() != '')
		.map((item) => item.split('='))

	const afterVal = afterUpdate
		.split(';')
		.filter((item) => item.trim() != '')
		.map((item) => item.split('=')[1])

	return (
		<div className="w-full flex text-0.8rem mt-1.5">
			<section className="w-1/3  border border-blue-400 py-1 flex flex-col">
				<span className="w-full h-2rem inline-flex justify-center items-center">{`项目`}</span>
				{itemsAndBeforeVal.map((item, index) => (
					<span
						key={index}
						className=" h-2rem flex border-top items-center justify-center"
					>
						{item[0] || ''}
					</span>
				))}
			</section>

			<section className="w-1/3 py-1 border border-blue-400 flex flex-col  border-left-none">
				<span className="w-full h-2rem inline-flex justify-center items-center">{`更新前`}</span>
				{itemsAndBeforeVal.map((item, index) => (
					<span
						key={index}
						className=" h-2rem border-top flex items-center justify-center"
					>
						{item[1] || ''}
					</span>
				))}
			</section>

			<section className="w-1/3 py-1 flex flex-col border border-blue-400 border-left-none">
				<span className="w-full h-2rem inline-flex justify-center items-center">{`更新后`}</span>
				{afterVal.map((item, index) => (
					<span
						key={index}
						className="h-2rem border-top flex items-center justify-center"
					>
						{item || ''}
					</span>
				))}
			</section>
		</div>
	)
}
