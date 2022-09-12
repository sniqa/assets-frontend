import AnimateWraper from '../../components/transition/AnimateWraper'
import { init } from 'echarts'
import { useEffect, useMemo, useRef } from 'react'
import ChartContainer, {
	EChartsOption,
} from '../../components/charts/ChartContainer'
import { useAppSelector } from '../../store'

const DevicesSummary = () => {
	const devices = useAppSelector((state) => state.device)
	const networkTypes = useAppSelector((state) => state.networkTypes)

	const option = useMemo<EChartsOption>(
		() => ({
			title: {
				text: '总数',
				subtext: devices.length.toString(),
				subtextStyle: {
					fontSize: 40,
				},
				textStyle: {
					fontSize: 50,
				},
				left: 'center',
				top: 'center',
			},
			legend: {
				top: 'bottom',
			},
			toolbox: {
				show: true,
				feature: {
					mark: { show: true },
					dataView: { show: true, readOnly: false },
					restore: { show: true },
					saveAsImage: { show: true },
				},
			},
			series: [
				{
					name: 'Area Mode',
					type: 'pie',
					radius: [180, 240],
					center: ['50%', '50%'],
					itemStyle: {
						borderRadius: 5,
					},
					data: networkTypes.map((networkType) => ({
						value: devices.filter(
							(device) => device.network_type === networkType.network_name
						).length,
						name: networkType.network_name,
					})),

					label: {
						show: true,
						// position: 'inner',
						fontSize: '30',
						formatter: (arg) => {
							return arg.name + ` - ` + arg.value
						},
					},
				},
			],
		}),
		[devices]
	)

	return (
		<AnimateWraper className="w-full h-full">
			<ChartContainer
				title="设备"
				options={option}
				className={`w-full h-full`}
			/>
		</AnimateWraper>
	)
}

export default DevicesSummary
