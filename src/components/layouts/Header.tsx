import { ArrowBack } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { getRouterMap } from '../../router/path'

const Header = () => {
	const { pathname } = useLocation()

	const navigate = useNavigate()

	return (
		<div className="flex items-center h-3rem">
			<IconButton onClick={() => navigate(-1)}>
				<ArrowBack />
			</IconButton>

			<Typography className="pl-0.8rem" component={`h3`}>
				{getRouterMap(pathname.split('/').pop() || '')}
			</Typography>
		</div>
	)
}

export default Header
