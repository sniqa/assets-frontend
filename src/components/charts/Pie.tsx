import { EChartsOption } from 'echarts'
import { useMemo } from 'react'
import ChartContainer, { ChartContainerProps } from './ChartContainer'

type PipCharts = Omit<ChartContainerProps, 'options'> & {
	total_sum: number
	data: any
}

const PipCharts = (props: PipCharts) => {
	const { total_sum, data, ...prop } = props

	const options = useMemo<EChartsOption>(() => {
		return {
			title: {
				text: '总数',
				subtext: total_sum.toString(),
				subtextStyle: {
					fontSize: 40,
				},
				textStyle: {
					fontSize: 30,
				},
				left: 'center',
				top: 'center',
			},
			legend: {
				top: 'bottom',
			},
			toolbox: {
				show: false,
				feature: {
					mark: { show: true },
				},
			},
			series: [
				{
					name: 'Area Mode',
					type: 'pie',
					radius: ['40%', '50%'],
					center: ['50%', '50%'],
					itemStyle: {
						borderRadius: 5,
					},
					data,

					label: {
						show: true,
						position: 'inner',
						fontSize: '16',
						formatter: (arg: any) => {
							return arg.name + ` - ` + arg.value
						},
					},
				},
			],
		}
	}, [data, total_sum])

	return <ChartContainer {...prop} options={options} />
}

export default PipCharts
