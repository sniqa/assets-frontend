import { Paper } from '@mui/material'
import { usePagination } from '@table-library/react-table-library/pagination'
import { useRowSelect } from '@table-library/react-table-library/select'
import { Table, TableNode } from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'
import { Virtualized } from '@table-library/react-table-library/virtualized'
import { useEffect, useMemo, useState } from 'react'
import { downloadTable } from './share'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import TableToolbar from './TableToolbar'

import { CustomTableProps, SearchCondition } from './types'

const scrollbar = `scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 scrollbar-thumb-rounded-full`

const CustomTable = (props: CustomTableProps) => {
	const {
		columns,
		rows,
		extensions,
		operate,
		onDeleteSelection = () => {},
	} = props

	const rowsWithId: TableNode[] = useMemo(
		() => rows.map((row) => ({ ...row, id: row._id })),
		[rows]
	)

	//
	const [filterData, setFilterData] = useState(rowsWithId)

	// 皮肤格式设置
	const theme = useTheme({
		Table: `
        --data-table-library_grid-template-columns: 48px repeat(${
					operate ? columns.length + 1 : columns.length
				}, minmax(0, 1fr));
      `,
		BaseCell: `
			text-align: center; 
			`,
	})

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

	// 隐藏列
	const [hiddenColumns, setHiddenColumns] = useState(() => {
		const result = {}
		columns.forEach((value) => {
			Reflect.set(result, value.label, true)
		})
		return result
	})

	// 搜索
	const search = (condition: SearchCondition) => {
		setFilterData(
			rowsWithId.filter((row) => {
				const { field, value } = condition
				if (!field && !value) return filterData

				const { id, ...nodes } = row

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
					columns={columns}
					extensions={extensions}
					onFilter={setHiddenColumns}
					isSelectionEmpty={selectedRowsId.length <= 0}
					onSearch={(condition) => search(condition)}
					onDownloadCSV={() =>
						downloadTable({
							tableHeader: columns,
							selectionData: filterData.filter((row) =>
								selectedRowsId.includes(row.id)
							),
						})
					}
					onDeleteSelection={() => onDeleteSelection(selectedRowsId)}
				/>
			</section>

			<section className={`table-height-normal ${scrollbar}`}>
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
									columns={columns}
									filter={hiddenColumns}
									operate={operate}
								/>
							)}
							body={(node, index) => (
								<TableBody
									select={select}
									columns={columns}
									row={node}
									filter={hiddenColumns}
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
