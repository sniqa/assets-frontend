import ReactTable from '../../components/table/ReactTable'
import TableToolbar from '../../components/table/TableToolbar'
import AnimateWraper from '../../components/transition/AnimateWraper'

const Computer = () => {
	return (
		<AnimateWraper className="w-full overflow-hidden flex flex-col border">
			<TableToolbar />
			{/* <CustomTable colums={[]} rows={data} /> */}
			<ReactTable />
		</AnimateWraper>
	)
}

export default Computer
