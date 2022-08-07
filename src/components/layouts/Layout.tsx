import { Fragment } from 'react'

interface LayoutProps {
	header: JSX.Element
	main: JSX.Element
	aside: JSX.Element
	notice?: JSX.Element
}

const Layout = (props: LayoutProps) => {
	const { header, main, aside, notice } = props

	return (
		<Fragment>
			{notice}
			<header>{header}</header>
			<div className="flex-grow inline-flex">
				<aside className={`inline-flex h-full`}>{aside}</aside>
				<main className={`inline-flex h-full ml-3 w-full flex-col`}>
					{main}
				</main>
			</div>
		</Fragment>
	)
}

export default Layout
