import { TablePagination, Typography } from '@mui/material'
import { Pagination } from '@table-library/react-table-library/pagination'

interface TablePaginationProps {
	count: number
	selected?: number
	pagination: Pagination
}

const TableFooter = (props: TablePaginationProps) => {
	const { count, pagination, selected = 0 } = props

	return (
		<div className="w-full flex items-center justify-between pl-2">
			<section className="flex">
				<Typography color={'primary'} className={`px-2`}>
					{selected}
				</Typography>
				<Typography>{` of `}</Typography>
				<Typography color={'primary'} className={`px-2`}>
					{count}
				</Typography>
				<Typography>{` rows selected`}</Typography>
			</section>

			<section>
				<TablePagination
					component="div"
					count={count}
					page={pagination.state.page}
					rowsPerPage={pagination.state.size}
					onPageChange={(event, page) => pagination.fns.onSetPage(page)}
					onRowsPerPageChange={(event) =>
						pagination.fns.onSetSize(parseInt(event.target.value, 10))
					}
				/>
			</section>
		</div>
	)
}

export default TableFooter
