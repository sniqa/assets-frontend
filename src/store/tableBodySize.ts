import { createSlice } from '@reduxjs/toolkit'

interface TableBodySize {
	widthIsZoom: boolean
	heightIsZoom: boolean
}

const initialState: TableBodySize = {
	widthIsZoom: false,
	heightIsZoom: false,
}

export const TableBodySizeSlice = createSlice({
	name: 'tableBodySize',
	initialState,
	reducers: {
		widthZoom: (state) => {
			return { ...state, widthIsZoom: !state.widthIsZoom }
		},
		heightZoom: (state) => {
			return { ...state, heightIsZoom: !state.heightIsZoom }
		},
	},
})

export const { widthZoom, heightZoom } = TableBodySizeSlice.actions

export default TableBodySizeSlice.reducer
