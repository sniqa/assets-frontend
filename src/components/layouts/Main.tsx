import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs, Typography } from '@mui/material'
import { Fragment } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import SuspenseLoading from '../transition/SuspenseLoading'

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
								{path}
							</Link>
						) : (
							<Typography className={`text-gray-400`} key={key}>
								{path}
							</Typography>
						)
					)}
				</Breadcrumbs>
			</section>

			<section className="flex-grow overflow-hidden reletive flex">
				<SuspenseLoading element={<Outlet />} />
			</section>
		</Fragment>
	)
}

export default Main
