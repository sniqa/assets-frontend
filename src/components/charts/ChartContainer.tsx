import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
// import {
// 	BarChart,
// 	LineChart,
// 	PieChart,
// 	PieSeriesOption,
// 	BarSeriesOption,
// 	LineSeriesOption,
// } from 'echarts/charts'
// import {
// 	TitleComponent,
// 	TitleComponentOption,
// 	TooltipComponent,
// 	TooltipComponentOption,
// 	GridComponent,
// 	GridComponentOption,
// 	DatasetComponent,
// 	DatasetComponentOption,
// 	TransformComponent,
// } from 'echarts/components'

// import { LabelLayout, UniversalTransition } from 'echarts/features'
// import { CanvasRenderer } from 'echarts/renderers'

// type ECOption = ComposeOption<
// 	| PieSeriesOption
// 	| BarSeriesOption
// 	| LineSeriesOption
// 	| TitleComponentOption
// 	| TooltipComponentOption
// 	| GridComponentOption
// 	| DatasetComponentOption
// >

// echarts.use([
// 	TitleComponent,
// 	TooltipComponent,
// 	GridComponent,
// 	DatasetComponent,
// 	TransformComponent,
// 	PieChart,
// 	BarChart,
// 	LineChart,
// 	LabelLayout,
// 	UniversalTransition,
// 	CanvasRenderer,
// ])

export type EChartsOption = echarts.EChartsOption

interface ChartContainerProps {
	options: EChartsOption
	title?: string
	className?: string
}

const ChartContainer = ({ className, options, title }: ChartContainerProps) => {
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const echart = echarts.init(ref.current!)

		echart.setOption(options)

		return echart.resize()
	}, [])

	return (
		<div className={`${className} flex flex-col justify-center`}>
			{title && <h3 className="text-2rem text-blod text-center">{title}</h3>}
			<div ref={ref} className={`flex-grow`}></div>
		</div>
	)
}

export default ChartContainer
