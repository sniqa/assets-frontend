import MaterialCheckbox from '@mui/material/Checkbox'
import { HeaderCell, HeaderRow } from '@table-library/react-table-library/table'
import { TableHeaderProps } from './types'

const resize = { resizerHighlight: '#dde2eb' }

const TableHeader = (props: TableHeaderProps) => {
	const { select, columns, filter = {}, operate } = props

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
				<HeaderCell resize={resize} key={column.label} hide={!column.isSelect}>
					{column.label}
				</HeaderCell>
			))}

			{operate && <HeaderCell>{operate.header}</HeaderCell>}
		</HeaderRow>
	)
}

export default TableHeader
