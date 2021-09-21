import { call, put, takeLatest } from '@redux-saga/core/effects';
import cityApi from '../../api/citiApi';
import { City, ListResponse } from '../../models';
import { cityActions } from './citySlice';

function* fetchCityList() {
	try {
		const response: ListResponse<City> = yield call(cityApi.getAll);
		yield put(cityActions.fetchCitySuccess(response));
	} catch (error) {
		yield put(cityActions.fetchCityFail());
	}
}

export function* citySaga() {
	yield takeLatest(cityActions.fetchCity, fetchCityList);
}
