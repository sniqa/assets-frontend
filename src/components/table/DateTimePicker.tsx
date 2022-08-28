import { ConfigProvider, DatePicker } from 'antd'
import { TimestampRange } from './types'
import moment from 'moment'
import 'moment/locale/zh-cn'
import locale from 'antd/es/locale/zh_CN'
moment.locale('zh-cn')

const { RangePicker } = DatePicker

type DateRangeStr = [string, string]

interface DateTimePicker {
	onChange?: (val: TimestampRange) => void
}

const DateTimePicker = ({ onChange }: DateTimePicker) => {
	const handleOnChange = (dateRange: DateRangeStr) => {
		if (!onChange) {
			return
		}

		const [start_timestamp, end_timestamp] = dateRange.map(
			(date) => new Date(date).getTime() || 0
		)

		onChange({
			start_timestamp,
			end_timestamp,
		})
	}

	return (
		<div className="mx-2">
			<ConfigProvider locale={locale}>
				<RangePicker showTime onChange={(_, str) => handleOnChange(str)} />
			</ConfigProvider>
		</div>
	)
}

export default DateTimePicker
