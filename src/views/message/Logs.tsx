import { Button, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { _fetch } from '../../apis/fetch'

import Table, { TableColumn, TableDialog } from '../../components/table'
import AnimateWraper from '../../components/transition/AnimateWraper'

const columns: TableColumn[] = [
	{ label: '时间', field: 'current_time' },
	{ label: '操作人', field: 'who' },
	{ label: '对象', field: 'for_who' },
	{ label: '事件', field: 'event' },
	{ label: '原因', field: 'reason' },
	{ label: '信息', field: 'message' },
	{ label: '更新前', field: 'beforeUpdate' },
	{ label: '更新后', field: 'afterUpdate' },
]

const Logs = () => {
	const [logs, setLogs] = useState<any[]>([])

	useEffect(() => {
		const getLogs = () =>
			_fetch({ FIND_LOGS: {} }).then((res) => {
				const { FIND_LOGS } = res
				if (FIND_LOGS) {
					const { success, data } = FIND_LOGS

					success && setLogs(data)
				}
			})

		getLogs()
	}, [])

	const [openDialog, setOpenDialog] = useState(false)

	const [selectRow, setSelectRow] = useState({})

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
				dateTimePickerOnChange={(val) => console.log(val)}
			/>

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
								lable="原因"
								value={Reflect.get(selectRow, 'reason')}
							/>
							<LogDetail
								lable="信息"
								value={Reflect.get(selectRow, 'message')}
							/>

							<LogDetail
								lable="更新内容"
								value={
									<DisplayUpdateContent
										beforeUpdate={Reflect.get(selectRow, 'beforeUpdate')}
										afterUpdate={Reflect.get(selectRow, 'afterUpdate')}
									/>
								}
							/>
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
