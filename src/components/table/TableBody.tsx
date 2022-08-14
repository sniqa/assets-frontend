import { Tooltip } from '@mui/material'
import MaterialCheckbox from '@mui/material/Checkbox'
import { Cell, Row } from '@table-library/react-table-library/table'
import { TableBodyProps } from './types'

const getValue = (val: any) => {
	if (val === 0) return '0'

	return val || ''
}

const TableBody = (props: TableBodyProps) => {
	const { select, row, columns, filter = {}, oprate } = props

	return (
		<Row item={row}>
			<Cell stiff>
				<MaterialCheckbox
					inputProps={{ 'aria-label': 'select item' }}
					size="small"
					checked={select.state.ids.includes(row.id)}
					onChange={() => select.fns.onToggleById(row.id)}
				/>
			</Cell>
			{columns.map((column) => {
				const value = getValue(row[column.field])

				return (
					<Cell
						key={column.label}
						hide={!Reflect.get(filter, column.label) || false}
					>
						<Tooltip title={value} placement="bottom">
							<span>{value}</span>
						</Tooltip>
					</Cell>
				)
			})}

			{oprate && <Cell>{oprate.cell(row)}</Cell>}
		</Row>
	)
}

export default TableBody
