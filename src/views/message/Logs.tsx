import { IconButton, TextField, Tooltip } from "@mui/material"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useEffect, useState } from "react"
import { _fetch } from "../../apis/fetch"
import { SearchIcon } from "../../components/icons"

const Logs = () => {
	const [logs, setLogs] = useState<any[]>([])

	useEffect(() => {
		const getLogs = () =>
			_fetch({ FIND_LOGS: {} }).then((res) => {
				const { FIND_LOGS } = res
				if (FIND_LOGS) {
					const { success, data } = FIND_LOGS
					console.log(FIND_LOGS)
					console.log(data)

					success && setLogs(data)
				}
			})

		getLogs()
	}, [])

	const [start, setStart] = useState<Date | null>(new Date())
	const [end, setEnd] = useState<Date | null>(new Date())

	return (
		<div className="">
			<section className="p-2 flex items-center">
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DateTimePicker
						label={`开始时间`}
						value={start}
						onChange={(date) => setStart(date)}
						renderInput={(params) => <TextField {...params} />}
					/>
					<DateTimePicker
						label={`结束时间`}
						value={end}
						onChange={(date) => setEnd(date)}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>

				<Tooltip title={`搜索`}>
					<IconButton>
						<SearchIcon color="primary" />
					</IconButton>
				</Tooltip>
			</section>

			<section className="flex flex-col">
				{logs.map((log, index) => (
					<Log key={index} message={log} />
				))}
			</section>
		</div>
	)
}

export default Logs

const Log = (props: any) => {
	const { current_time, event, type, who, message } = props.message
	return (
		<div className="flex">
			<span>{current_time}</span>
			<span>{event}</span>
			<span>{type}</span>
			<span>{who}</span>
			<span>{message}</span>
		</div>
	)
}
