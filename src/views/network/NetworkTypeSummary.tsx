import AnimateWraper from '../../components/transition/AnimateWraper'
import { init } from 'echarts'
import { useEffect, useMemo, useRef } from 'react'
import ChartContainer, {
	EChartsOption,
} from '../../components/charts/ChartContainer'
import PipCharts from '../../components/charts/Pie'
import { useAppSelector } from '../../store'

const NetworkTypeSummary = () => {
	const ipAddress = useAppSelector((state) => state.ipAddress)
	const networkTypes = useAppSelector((state) => state.networkTypes)

	return (
		<AnimateWraper className="w-full h-full">
			<div className="w-full h-full flex justify-between">
				{networkTypes.map((networkType) => (
					<PipCharts
						key={networkType._id}
						title={networkType.network_name}
						className={`w-1/${networkTypes.length} h-full`}
						total_sum={networkType.total_number}
						data={[
							{
								value: ipAddress
									.filter(
										(ip) =>
											ip.network_type === networkType.network_name && ip.is_used
									)
									.length.toString(),
								name: '已使用',
							},
							{
								value: ipAddress
									.filter(
										(ip) =>
											ip.network_type === networkType.network_name &&
											!ip.is_used
									)
									.length.toString(),
								name: '未使用',
							},
						]}
					/>
				))}
			</div>
		</AnimateWraper>
	)
}

export default NetworkTypeSummary
