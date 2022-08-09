import MaterialCheckbox from '@mui/material/Checkbox'
import { usePagination } from '@table-library/react-table-library/pagination'
import { useRowSelect } from '@table-library/react-table-library/select'
import {
	Body,
	Cell,
	Header,
	HeaderCell,
	HeaderRow,
	Row,
	Table,
	TableNode,
} from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'
export type { TableNode }

const resize = { resizerHighlight: '#dde2eb' }

const scrollbar = `scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 scrollbar-thumb-rounded-full`

interface Table2Column {
	label: string
	field: string
}

interface Table2Props {
	columns: Table2Column[]
	rows: TableNode[]
}

const Table2 = (props: Table2Props) => {
	const { columns, rows } = props

	const data = { nodes: rows }

	const theme = useTheme({
		Table: `
        --data-table-library_grid-template-columns: 48px repeat(${
					columns.length + 1
				}, minmax(0, 1fr));
      `,
	})

	const pagination = usePagination(data, {
		state: {
			page: 0,
			size: 20,
		},
		onChange: onPaginationChange,
	})

	function onPaginationChange(action, state) {
		console.log(action, state)
	}

	const onSelectChange = (action, state) => {
		console.log(action, state)
	}
	const select = useRowSelect(data, {
		onChange: onSelectChange,
	})

	return (
		<div className={`table-height-normal rounded-xl p-2 ${scrollbar}`}>
			<Table
				data={data}
				theme={theme}
				select={select}
				layout={{ custom: true, horizontalScroll: true, fixedHeader: true }}
				pagination={pagination}
				className={`${scrollbar}`}
			>
				{(rows) => (
					<>
						<Header>
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
						</Header>

						<Body>
							{rows.map((row) => (
								<Row key={row.id} item={row}>
									<Cell stiff>
										<MaterialCheckbox
											inputProps={{ 'aria-label': 'select item' }}
											size="small"
											checked={select.state.ids.includes(row.id)}
											onChange={() => select.fns.onToggleById(row.id)}
										/>
									</Cell>
									{columns.map((column) => (
										<Cell key={column.label}>{row[column.field] || ''}</Cell>
									))}

									<Cell>{`操作`}</Cell>
								</Row>
							))}
						</Body>
					</>
				)}
			</Table>
		</div>
	)
}

export default Table2
