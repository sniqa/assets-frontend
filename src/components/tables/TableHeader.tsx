import MaterialCheckbox from '@mui/material/Checkbox'
import type { Select } from '@table-library/react-table-library/select'
import { HeaderCell, HeaderRow } from '@table-library/react-table-library/table'

const resize = { resizerHighlight: '#dde2eb' }

interface TableHeaderProps {
	select: Select
	columns: any[]
}

const TableHeader = (props: TableHeaderProps) => {
	const { select, columns } = props

	return (
		<HeaderRow>
			<HeaderCell stiff>
				<MaterialCheckbox
					inputProps={{ 'aria-label': 'select all' }}
					size="small"
					checked={select.state.all}
					indeterminate={!select.state.all && !select.state.none}
					onChange={select.fns.onToggleAll}
				/>
			</HeaderCell>
			{columns.map((column) => (
				<HeaderCell resize={resize} key={column.label}>
					{column.label}
				</HeaderCell>
			))}

			<HeaderCell>{`操作`}</HeaderCell>
		</HeaderRow>
	)
}

export default TableHeader
