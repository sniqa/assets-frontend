import { TableNode } from '@table-library/react-table-library'
import { notice } from './../../apis/mitt'
import { TableColumn } from './types'

interface DownloadCSV {
	tableHeader: TableColumn[]
	selectionData: TableNode[]
	filename?: string
}

export const downloadTable = ({
	tableHeader,
	selectionData,
	filename = new Date().getTime().toString(),
}: DownloadCSV) => {
	const data = selectionData.map((item) => {
		const { id, _id, ...res } = item

		return tableHeader.map((item) => res[item.field])
	})

	const formatData = [tableHeader.map((item) => item.label).join(',')].concat(
		data.join('\n')
	)

	createCsvFile(formatData, filename)

	notice({
		status: 'success',
		message: '下载成功, 请稍后...',
	})
}

// 创建并下载csv文件
const createCsvFile = (data: string[], filename: string) => {
	const blob = new Blob(['\ufeff' + data.join('\n')], {
		type: 'text/csv,charset=UTF-8',
	})

	const link = document.createElement('a')

	link.href = URL.createObjectURL(blob)

	link.download = `${filename}.csv`

	link.click()
}

export const getValueForHeader = (header?: any) => {
	if (typeof header === 'function') {
		return header().props.children
	} else if (typeof header === 'string') {
		return header
	}

	return ''
}
