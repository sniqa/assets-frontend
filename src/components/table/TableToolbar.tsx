import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import FilterListIcon from '@mui/icons-material/FilterList'
import FilterListOffIcon from '@mui/icons-material/FilterListOff'
import SearchIcon from '@mui/icons-material/Search'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	IconButton,
	Tooltip,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'

const SEARCH_ICON_TOOLTIP = '查找字段'
const FILTER_ICON_TOOLTIP = '过滤字段'
const DELETE_SELECTION_ROWS_TOOLTIP = '删除所选'
const ADD_TOOLTIP = '添加'
const FILE_DOWNLOAD_TOOLTIP = '导出至csv文件'
const FILE_UPLOAD_TOOLTIP = '导入文件'

interface TableToolbarExtension {
	icon: JSX.Element
	title: string
	onClick?: () => void
}

export type TableToolbarExtensions = Array<TableToolbarExtension>

export interface TableToolbarProps {
	extensions?: TableToolbarExtensions
}

const CustomizedAccordions = ({ extensions }: TableToolbarProps) => {
	const [expanded, setExpanded] = React.useState(false)

	return (
		<div>
			<Accordion
				disableGutters
				elevation={0}
				square
				expanded={expanded}
				// onChange={handleChange('panel1')}
			>
				<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
					<section className="flex justify-center items-center">
						{/* 删除  */}
						<Tooltip title={DELETE_SELECTION_ROWS_TOOLTIP}>
							<div className={``}>
								<IconButton
									onClick={() => {}}
									// disabled={isSelectionEmpty}
								>
									{true ? (
										<DeleteOutlineIcon color="action" />
									) : (
										<DeleteIcon color="primary" />
									)}
								</IconButton>
							</div>
						</Tooltip>

						{/* 导出至csv文件 */}
						<Tooltip title={FILE_DOWNLOAD_TOOLTIP}>
							<div className={``}>
								<IconButton
									onClick={() => {}}
									// disabled={isSelectionEmpty}
								>
									<FileDownloadIcon color="primary" />
								</IconButton>
							</div>
						</Tooltip>

						{/* 导入文件 */}
						<Tooltip title={FILE_UPLOAD_TOOLTIP}>
							<div className="cursor-not-allowed">
								<IconButton disabled>
									<FileUploadIcon color={`disabled`} />
								</IconButton>
							</div>
						</Tooltip>

						{/* 搜索 */}
						<Tooltip title={SEARCH_ICON_TOOLTIP}>
							<IconButton onClick={() => setExpanded(!expanded)}>
								{true ? (
									<SearchOffIcon color="primary" />
								) : (
									<SearchIcon color="primary" />
								)}
							</IconButton>
						</Tooltip>

						{/* 选择字段 */}
						<Tooltip title={FILTER_ICON_TOOLTIP}>
							<IconButton onClick={() => setExpanded(!expanded)}>
								{true ? (
									<FilterListOffIcon color="primary" />
								) : (
									<FilterListIcon color="primary" />
								)}
							</IconButton>
						</Tooltip>

						{/* 左边自定义功能区  */}
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
				</AccordionSummary>
				<AccordionDetails className="h-8rem">
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
						dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
						lacus ex, sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>
	)
}

export default CustomizedAccordions
