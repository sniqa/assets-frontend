import { TablePagination, Typography } from '@mui/material'
import { Updater } from '@tanstack/react-table'

interface TableFooterProps {
	pageIndex: number
	pageSize: number
	setPageIndex: (updater: Updater<number>) => void
	setPageSize: (updater: Updater<number>) => void
	rowCount: number
	rowSelection?: number
}

const LABEL_ROWS_PER_PAGE = '每页行数：'

const TableFooter = (porps: TableFooterProps) => {
	const {
		pageIndex,
		pageSize,
		setPageIndex,
		setPageSize,
		rowCount,
		rowSelection = 0,
	} = porps

	return (
		<div className="w-full flex justify-between items-center">
			<Typography>
				<span className="text-blue-500 pl-4">{` ${rowSelection} `}</span>
				{`of`}
				<span className="text-blue-500">{` ${rowCount} `}</span>
				{`Total Rows Selected`}
			</Typography>

			<TablePagination
				component="div"
				count={rowCount}
				page={pageIndex}
				labelRowsPerPage={LABEL_ROWS_PER_PAGE}
				onPageChange={(e, index) => setPageIndex(index)}
				rowsPerPage={pageSize}
				onRowsPerPageChange={(e) => {
					setPageSize(Number(e.target.value))
				}}
			/>
		</div>
	)
}

export default TableFooter
