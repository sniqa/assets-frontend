import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs, Typography } from '@mui/material'
import { Fragment } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import SuspenseLoading from '../transition/SuspenseLoading'
import { getRouterMap } from '../../router/path'

const scrollbar = `scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 scrollbar-thumb-rounded-full`

const arrayFind = (target: string, source: Array<string>) => {
	let temp = ''

	const len = source.length

	for (let i = 0; i <= len; i++) {
		const str = source[i]

		temp += `/${str}`

		if (str === target) {
			break
		}
	}

	return temp
}

const Main = () => {
	const { pathname, key } = useLocation()

	const pathArray = pathname.split('/')

	pathArray.shift()

	return (
		<Fragment>
			<section className="h-4rem flex items-center">
				<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
					{pathArray.map((path, index) =>
						index < pathArray.length - 1 ? (
							<Link
								to={arrayFind(path, pathArray)}
								key={key}
								className={`text-blue-600`}
							>
								{getRouterMap(path)}
							</Link>
						) : (
							<Typography className={`text-gray-400`} key={key}>
								{getRouterMap(path)}
							</Typography>
						)
					)}
				</Breadcrumbs>
			</section>

			<section
				className={`flex-grow overflow-auto reletive flex main-height-normal ${scrollbar}`}
			>
				<SuspenseLoading element={<Outlet />} />
			</section>
		</Fragment>
	)
}

export default Main
