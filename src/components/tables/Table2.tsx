import { Paper } from '@mui/material'
import { usePagination } from '@table-library/react-table-library/pagination'
import { useRowSelect } from '@table-library/react-table-library/select'
import { Table, TableNode } from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'
import { Virtualized } from '@table-library/react-table-library/virtualized'
import { useState } from 'react'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import TablePagination from './TablePagination'
import TableToolbar from './TableToolbar'
import { TableColumn } from './types'
export type { TableNode }

const scrollbar = `scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 scrollbar-thumb-rounded-full`

interface Table2Props {
	columns: TableColumn[]
	rows: TableNode[]
}

const Table2 = (props: Table2Props) => {
	const { columns, rows } = props

	const data = { nodes: rows }

	// 皮肤格式设置
	const theme = useTheme({
		Table: `
        --data-table-library_grid-template-columns: 48px repeat(${
					columns.length + 1
				}, minmax(0, 1fr));
      `,
	})

	// 分页设置
	const pagination = usePagination(data, {
		state: {
			page: 0,
			size: 10,
		},
		// onChange: onPaginationChange,
	})

	// 存储选中的行的id
	const [selectedRowsId, setSelectedRowsId] = useState([])

	// 选中行设置
	const select = useRowSelect(data, {
		state: {},
		onChange: (action, state) => {
			setSelectedRowsId(state.ids)
		},
	})

	return (
		<Paper className="p-2 min-w-38rem">
			<section className="h-3rem">
				<TableToolbar columns={columns} />
			</section>

			<section className={`table-height-normal ${scrollbar}`}>
				<Table
					data={data}
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
					{(rows) => (
						<Virtualized
							tableList={rows}
							rowHeight={38}
							header={() => <TableHeader select={select} columns={columns} />}
							body={(node, index) => (
								<TableBody select={select} columns={columns} row={node} />
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
					count={data.nodes.length}
					selected={selectedRowsId.length}
				/>
			</section>
		</Paper>
	)
}

export default Table2
