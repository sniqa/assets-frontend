import { Dialog, Tooltip } from "@mui/material"
import MaterialCheckbox from "@mui/material/Checkbox"
import { Cell, Row } from "@table-library/react-table-library/table"
import { Fragment, useState } from "react"
import { TableBodyProps } from "./types"

const getValue = (val: any) => {
	if (val === 0) return "0"

	return val || ""
}

interface IdData {
	id: string
	[x: string]: any
}

const removeId = (data: IdData) => {
	const { id, ...res } = data
	return res
}

const TableBody = (props: TableBodyProps) => {
	const { select, row, columns, filter = {}, oprate } = props

	return (
		<Fragment>
			{
				<Row item={row}>
					<Cell stiff>
						<MaterialCheckbox
							inputProps={{ "aria-label": "select item" }}
							size="small"
							checked={select.state.ids.includes(row.id)}
							onChange={() => select.fns.onToggleById(row.id)}
						/>
					</Cell>
					{columns.map((column) => {
						const value = getValue(row[column.field])

						return (
							<Cell key={column.label} hide={!column.isSelect}>
								<Tooltip title={value} placement="bottom">
									<span>{value}</span>
								</Tooltip>
							</Cell>
						)
					})}

					{oprate && <Cell>{oprate.cell(removeId(row))}</Cell>}
				</Row>
			}
		</Fragment>
	)
}

export default TableBody
