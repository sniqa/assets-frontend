import Table2, { TableNode } from '../../components/tables/Table2'
import AnimateWraper from '../../components/transition/AnimateWraper'
const columns = [
	{ label: 'firstname', field: 'first' },
	{ label: 'lastname', field: 'last' },
	{ label: 'fullname', field: 'full' },
	{ label: 'idx', field: 'idx' },
	{ label: 'test', field: 'test' },
]

const rows: TableNode[] = [
	{
		id: '1',
		first: 'hello',
		last: 'world',
		full: 'hw',
		idx: 3,
		test: '1',
	},
	{ id: '3', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '4', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '5', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '6', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '7', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '17', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '27', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '37', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '47', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '57', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '67', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '77', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '87', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '567', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '357', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '6347', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '347', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '5367', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '732', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '537', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
	{ id: '217', first: 'hello', last: 'world', full: 'hw', idx: 3, test: '1' },
]

const Computer = () => {
	return (
		<AnimateWraper className="w-full">
			{/* <CustomTable colums={[]} rows={data} /> */}
			{/* <CustomTable columns={columns} rows={[]} /> */}
			<Table2 columns={columns} rows={rows} />
		</AnimateWraper>
	)
}

export default Computer
