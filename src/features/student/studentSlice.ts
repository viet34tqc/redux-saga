import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
	ListParams,
	ListResponse,
	PaginationParams,
	Student,
} from '../../models';

export interface StudentState {
	loading: boolean;
	list: Student[];
	filter: ListParams;
	pagination: PaginationParams;
}

const initialState: StudentState = {
	loading: false,
	list: [],
	filter: {
		_page: 1,
		_limit: 15,
	},
	pagination: {
		_page: 1,
		_limit: 15,
		_totalRows: 15,
	},
};

const studentSlice = createSlice({
	name: 'student',
	initialState,
	reducers: {
		fetchStudentList(state, action: PayloadAction<ListParams>) {
			state.loading = true;
		},
		// Of course, we can extract this reducer into 2 reducer setList, setPagination
		fetchStudentListSuccess(
			state,
			action: PayloadAction<ListResponse<Student>>
		) {
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
			state.loading = false;
		},
		fetchStudentListFailed(state, action: PayloadAction<string>) {
			state.loading = false;
		},

		setFilter(state, action: PayloadAction<ListParams>) {
			state.filter = action.payload;
		},
	},
});

export const {
	fetchStudentList,
	fetchStudentListSuccess,
	fetchStudentListFailed,
	setFilter,
} = studentSlice.actions;

export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentPagination = (state: RootState) =>
	state.student.pagination;
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentFilter = (state: RootState) => state.student.filter;

const studentReducer = studentSlice.reducer;
export default studentReducer;
