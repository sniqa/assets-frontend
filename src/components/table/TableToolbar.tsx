import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import FilterListIcon from '@mui/icons-material/FilterList'
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { IconButton, OutlinedInput, Popover, Tooltip } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import React, { useState } from 'react'
import DateTimePicker from './DateTimePicker'
import { SearchCondition, TableColumn, TableToolbarProps } from './types'

const SEARCH_ICON_TOOLTIP = '查找字段'
const FILTER_ICON_TOOLTIP = '过滤字段'
const DELETE_SELECTION_ROWS_TOOLTIP = '删除所选'
const ADD_TOOLTIP = '添加'
const FILE_DOWNLOAD_TOOLTIP = '导出至csv文件'
const FILE_DOWNLOAD_DISABLED_TOOLTIP = '需先选中要下载的表数据'
const PDF_ICON_TOOLTIP = '导出至pdf'
const FILE_UPLOAD_TOOLTIP = '导入文件'

const TableToolbar = (props: TableToolbarProps) => {
	const {
		columns,
		isSelectionEmpty = true,
		extensions,
		onDeleteSelection,
		onDownloadCSV,
		onFilter,
		onSearch = () => {},
		displayDateTimePicker,
		dateTimePickerOnChange,
	} = props

	const [searchCondition, setSearchCondition] = useState<SearchCondition>({
		field: '',
		value: '',
	})

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	return (
		<div className="flex justify-between">
			<section className="flex">
				{/* 删除  */}
				<Tooltip title={DELETE_SELECTION_ROWS_TOOLTIP}>
					<div className={`${isSelectionEmpty ? 'cursor-not-allowed' : ''}`}>
						<IconButton onClick={onDeleteSelection} disabled={isSelectionEmpty}>
							{isSelectionEmpty ? (
								<DeleteOutlineIcon color="disabled" />
							) : (
								<DeleteIcon color="error" />
							)}
						</IconButton>
					</div>
				</Tooltip>

				{/* 导出至csv文件 */}
				<Tooltip
					title={`${
						isSelectionEmpty
							? FILE_DOWNLOAD_DISABLED_TOOLTIP
							: FILE_DOWNLOAD_TOOLTIP
					}`}
				>
					<div className={`${isSelectionEmpty ? 'cursor-not-allowed' : ''}`}>
						<IconButton onClick={onDownloadCSV} disabled={isSelectionEmpty}>
							<FileDownloadIcon
								color={`${isSelectionEmpty ? 'disabled' : 'primary'}`}
							/>
						</IconButton>
					</div>
				</Tooltip>

				{/* 导出至pdf文件 */}
				{/* <Tooltip title={PDF_ICON_TOOLTIP}>
					<div className={``}>
						<IconButton
							onClick={() => {}}
							// disabled={isSelectionEmpty}
						>
							<PictureAsPdfIcon color="primary" />
						</IconButton>
					</div>
				</Tooltip> */}

				{/* 导入文件 */}
				<Tooltip title={FILE_UPLOAD_TOOLTIP}>
					<div className="cursor-not-allowed">
						<IconButton disabled>
							<FileUploadIcon color={`disabled`} />
						</IconButton>
					</div>
				</Tooltip>

				{/* 选择字段 */}
				<Tooltip title={FILTER_ICON_TOOLTIP}>
					<IconButton onClick={handleClick}>
						<FilterListIcon color="primary" />
					</IconButton>
				</Tooltip>

				{/* 显示/隐藏字段 */}
				<Popover
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={() => setAnchorEl(null)}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
				>
					<div className="w-28rem p-4 flex flex-wrap">
						{columns.map((column) => (
							<SwitchLabels
								label={column.label}
								checked={Boolean(column.isSelect)}
								key={column.field}
								onChange={(checked) => {
									onFilter &&
										onFilter((oldColumns) =>
											oldColumns.map((col) =>
												col.field === column.field
													? {
															...col,
															isSelect: checked,
													  }
													: col
											)
										)
								}}
							/>
						))}
					</div>
				</Popover>

				{/* 自定义功能区  */}
				{extensions &&
					extensions.map((extension, index) => (
						<Tooltip title={extension.title} key={index}>
							<IconButton
								onClick={() => extension.onClick && extension.onClick()}
							>
								{extension.icon}
							</IconButton>
						</Tooltip>
					))}
			</section>

			{/* 时间选中和搜索 */}
			<section className="flex px-2 items-center justify-end ">
				{displayDateTimePicker && (
					<DateTimePicker onChange={dateTimePickerOnChange} />
				)}

				<CustomSelect
					selectList={columns}
					onChange={(val) => {
						setSearchCondition({ ...searchCondition, field: val })
						onSearch && onSearch({ field: val, value: searchCondition.value })
					}}
				/>
				<OutlinedInput
					placeholder="搜索:并且, 或者; "
					sx={{ height: '2rem', fontSize: '0.8rem' }}
					onChange={(e) => {
						const value = e.target.value
						setSearchCondition({ ...searchCondition, value })
						onSearch && onSearch({ field: searchCondition.field, value })
					}}
				/>
			</section>
		</div>
	)
}

export default TableToolbar

// 开关和描述文字
export const SwitchLabels = ({
	label,
	checked = true,
	onChange,
}: {
	label: string
	checked: boolean
	onChange?: (state: boolean) => void
}) => {
	return (
		<FormGroup>
			<FormControlLabel
				control={
					<Switch
						checked={checked}
						size="small"
						onChange={(e) => onChange && onChange(e.target.checked)}
					/>
				}
				label={label}
			/>
		</FormGroup>
	)
}

// 下拉框
interface CustomSelectProps {
	selectList: TableColumn[]
	onChange?: (value: string) => void
}

export const CustomSelect = ({ selectList, onChange }: CustomSelectProps) => {
	const [field, setField] = useState('')

	const handleChange = (event: SelectChangeEvent) => {
		const value = event.target.value as string

		setField(value)

		onChange && onChange(value)
	}

	return (
		<Select
			displayEmpty
			value={field}
			// size="small"
			onChange={handleChange}
			input={<OutlinedInput />}
			className={`w-6rem h-2rem`}
		>
			<MenuItem value={``} className={`h-2rem`}>{``}</MenuItem>

			{selectList.map((item) => (
				<MenuItem value={item.field} key={item.field}>
					{item.label}
				</MenuItem>
			))}
		</Select>
	)
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}
