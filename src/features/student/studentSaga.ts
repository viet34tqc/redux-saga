import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from '../../api/studentApi';
import { ListParams, ListResponse, Student } from '../../models';
import {
	fetchStudentList,
	fetchStudentListFailed,
	fetchStudentListSuccess,
	setFilter,
	setFilterDebounce,
} from './studentSlice';

function* fetchStudent(action: PayloadAction<ListParams>) {
	try {
		const response: ListResponse<Student> = yield call(
			studentApi.getAll,
			action.payload
		);
		yield put(fetchStudentListSuccess(response));
	} catch (error) {
		yield put(fetchStudentListFailed(error.message));
	}
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
	yield put(setFilter(action.payload));
}

export default function* studentSaga() {
	// Watch and fetch student
	yield takeLatest(fetchStudentList, fetchStudent);

	yield debounce(500, setFilterDebounce, handleSearchDebounce);
}
