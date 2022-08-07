import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface NavigataItemProps {
	leftIcon?: JSX.Element
	rightIcon?: JSX.Element
	title: JSX.Element | string
	detail: JSX.Element | string
	value?: JSX.Element | string
	to?: string
	onClick?: () => void
}

const NavigateItem = (props: NavigataItemProps) => {
	const {
		leftIcon,
		title,
		detail,
		value,
		rightIcon,
		onClick = () => {},
		to,
	} = props

	const navigate = useNavigate()

	const itemOnClick = () => {
		return to ? navigate(to) : onClick()
	}

	return (
		<div
			className="h-4.2rem px-4 mb-1.5 w-full flex items-center justify-between border rounded-md bg-light-200 nav-item-hover"
			onClick={itemOnClick}
		>
			<section className="flex-grow flex items-center">
				{leftIcon}
				<div className="flex flex-col ml-4 justify-between">
					<Typography className="">{title}</Typography>
					<Typography className="text-gray-600" sx={{ fontSize: '14px' }}>
						{detail}
					</Typography>
				</div>
			</section>

			<section className="flex items-center">
				{value}
				{rightIcon ? (
					rightIcon
				) : (
					<ArrowForwardIosIcon sx={{ fontSize: '0.8rem', ml: '0.8rem' }} />
				)}
			</section>
		</div>
	)
}

export default NavigateItem
