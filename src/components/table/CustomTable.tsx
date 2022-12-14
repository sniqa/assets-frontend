import { Paper } from '@mui/material'
import { usePagination } from '@table-library/react-table-library/pagination'
import { useRowSelect } from '@table-library/react-table-library/select'
import {
	Header,
	HeaderRow,
	HeaderCell,
	Table,
	TableNode,
} from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'
import { Virtualized } from '@table-library/react-table-library/virtualized'
import { useEffect, useMemo, useState } from 'react'
import { downloadTable } from './share'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import TableToolbar from './TableToolbar'

import { CustomTableProps, SearchCondition, TableColumn } from './types'

const scrollbar = `scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 scrollbar-thumb-rounded-full`

const getColumnsLength = (columns: TableColumn[]) => {
	return columns.filter((column) => column.isSelect != false).length
}

const CustomTable = (props: CustomTableProps) => {
	const {
		columns,
		rows,
		extensions,
		operate,
		displayDateTimePicker = false,
		onDeleteSelection = () => {},
		dateTimePickerOnChange,
	} = props

	const rowsWithId: TableNode[] = useMemo(
		() => rows.map((row) => ({ ...row, id: row._id })),
		[rows]
	)

	const [columnsWithSelect, setColumnsWithSelect] = useState(() =>
		columns.map((column) => ({ isSelect: true, ...column }))
	)

	const columnsLength = useMemo(() => getColumnsLength(columns), [columns])

	//
	const [filterData, setFilterData] = useState(rowsWithId)

	// 皮肤格式设置
	const theme = useMemo(
		() =>
			useTheme({
				Table: `
        --data-table-library_grid-template-columns: 48px repeat(${
					operate ? columnsLength + 1 : columnsLength
				}, minmax(0, 1fr));
      `,
				BaseCell: `
			text-align: center; 
			`,
			}),
		[columns]
	)

	// 分页设置
	const pagination = usePagination(
		{ nodes: filterData },
		{
			state: {
				page: 0,
				size: 10,
			},
			// onChange: onPaginationChange,
		}
	)

	// 存储选中的行的id
	const [selectedRowsId, setSelectedRowsId] = useState<Array<string | number>>(
		[]
	)

	// 选中行设置
	const select = useRowSelect(
		{ nodes: rowsWithId },
		{
			state: {},
			onChange: (action, state) => {
				setSelectedRowsId(state.ids)
			},
		}
	)

	// 搜索
	const search = (condition: SearchCondition) => {
		setFilterData(
			rowsWithId.filter((row) => {
				const { field, value } = condition
				if (!field && !value) return filterData

				const { id, ...nodes } = row

				// 搜索关键字包含','表示并且的关系
				if (value.includes(',')) {
					const keywords = value.split(',')

					return field
						? String(row[field]).includes(value)
						: keywords.every((keyword) =>
								Object.values(nodes).some(
									(val) => String(val).includes(keyword) || false
								)
						  )
				}

				// 搜索关键字包含';'表示或者的关系
				if (value.includes(';')) {
					const keywords = value.split(';')

					return field
						? String(row[field]).includes(value)
						: keywords.some((keyword) =>
								Object.values(nodes).some(
									(val) => String(val).includes(keyword) || false
								)
						  )
				}

				return field
					? String(row[field]).includes(value)
					: Object.values(nodes).some((val) => {
							return String(val).includes(value) || false
					  })
			})
		)
	}

	// 监视rowsWithId的变化
	useEffect(() => {
		setFilterData(rowsWithId)
	}, [rowsWithId])

	return (
		<Paper className="p-2 min-w-38rem w-full" elevation={0}>
			<section className="h-3rem">
				<TableToolbar
					dateTimePickerOnChange={dateTimePickerOnChange}
					columns={columnsWithSelect}
					extensions={extensions}
					onFilter={setColumnsWithSelect}
					isSelectionEmpty={selectedRowsId.length <= 0}
					onSearch={(condition) => search(condition)}
					displayDateTimePicker={displayDateTimePicker}
					onDownloadCSV={() =>
						downloadTable({
							tableHeader: columnsWithSelect,
							selectionData: filterData.filter((row) =>
								selectedRowsId.includes(row.id)
							),
						})
					}
					onDeleteSelection={() => {
						onDeleteSelection(selectedRowsId)
						setSelectedRowsId([])
					}}
				/>
			</section>

			<section className={`table-height-normal ${scrollbar}`}>
				{rowsWithId.length > 0 ? (
					<Table
						data={{ nodes: filterData }}
						theme={theme}
						select={select}
						layout={{
							isDiv: true,
							custom: true,
							horizontalScroll: true,
							fixedHeader: true,
						}}
						pagination={pagination}
						className={`${scrollbar}`}
					>
						{(rowsWithId) => (
							<Virtualized
								tableList={rowsWithId}
								rowHeight={38}
								header={() => (
									<TableHeader
										select={select}
										columns={columnsWithSelect}
										operate={operate}
									/>
								)}
								body={(node, index) => (
									<TableBody
										select={select}
										columns={columnsWithSelect}
										row={node}
										oprate={operate}
									/>
								)}
								tableOptions={{
									renderBeforeTable: undefined,
									renderAfterTable: undefined,
								}}
								rowOptions={{
									renderBeforeRow: undefined,
									renderAfterRow: undefined,
								}}
							/>
						)}
					</Table>
				) : (
					<div className="w-full border p-1 rounded text-center border-green-500 text-gray-500">{`没有数据`}</div>
				)}
			</section>

			<section>
				<TablePagination
					pagination={pagination}
					count={filterData.length}
					selected={selectedRowsId.length}
				/>
			</section>
		</Paper>
	)
}

export default CustomTable
