import { Select } from '@table-library/react-table-library/select'

export interface TableColumn {
	label: string
	field: string
	isSelect?: boolean
}

export interface SearchCondition {
	field: string
	value: string
}

interface TableToolbarExtension {
	icon: JSX.Element
	title: string
	onClick?: () => void
}
export type TableToolbarExtensions = Array<TableToolbarExtension>

export interface Operate {
	header: string
	cell: (value: any) => JSX.Element
}

export type TableRow<T = {}> = {
	_id: string
} & T

export interface CustomTableProps {
	columns: TableColumn[]
	rows: TableRow[]
	extensions?: TableToolbarExtensions
	operate?: Operate
	displayDateTimePicker?: boolean
	dateTimePickerOnChange?: (date: TimestampRange) => void
	onDeleteSelection?: (data: (string | number)[]) => {}
}

export interface TableToolbarProps {
	columns: TableColumn[]
	isSelectionEmpty?: boolean
	extensions?: TableToolbarExtensions
	onDeleteSelection?: () => void
	onDownloadCSV?: () => void
	displayDateTimePicker?: boolean
	dateTimePickerOnChange?: (date: TimestampRange) => void
	onFilter?: React.Dispatch<
		React.SetStateAction<
			{
				label: string
				field: string
				isSelect: boolean
			}[]
		>
	>
	onSearch?: (condition: SearchCondition) => void
}

export interface TableHeaderProps {
	select: Select
	columns: TableColumn[]
	operate?: Operate
}

export interface TableBodyProps {
	select: Select
	row: any
	columns: TableColumn[]
	oprate?: Operate
}

export interface TimestampRange {
	start_timestamp: number
	end_timestamp: number
}
