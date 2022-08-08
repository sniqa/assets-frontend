import ReactTable from '../../components/table/ReactTable'
import AnimateWraper from '../../components/transition/AnimateWraper'

const Computer = () => {
	return (
		<AnimateWraper className="w-full">
			{/* <CustomTable colums={[]} rows={data} /> */}
			<ReactTable />
		</AnimateWraper>
	)
}

export default Computer
