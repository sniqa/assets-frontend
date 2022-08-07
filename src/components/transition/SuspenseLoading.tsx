import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'

interface SuspenseLoadingProps {
	element: JSX.Element
}

const SuspenseLoading = ({ element }: SuspenseLoadingProps) => {
	return <Suspense fallback={<Loading />}>{element}</Suspense>
}

export default SuspenseLoading

const Loading = () => {
	return (
		<div className="h-full flex-grow flex justify-center items-center">
			<CircularProgress />
		</div>
	)
}
