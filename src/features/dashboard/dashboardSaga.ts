import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import cityApi from '../../api/citiApi';
import studentApi from '../../api/studentApi';
import { City, ListResponse, Student } from '../../models';
import {
	fetchData,
	fetchDataFailed,
	fetchDataSuccess,
	RankingByCity,
	setHighestStudentList,
	setLowestStudentList,
	setRankingByCityList,
	setStatistics,
} from './dashboardSlice';

function* fetchStatistics() {
	const responseList: ListResponse<Student>[] = yield all([
		call(studentApi.getAll, {
			_page: 1,
			_limit: 5,
			gender: 'male',
		}),
		call(studentApi.getAll, {
			_page: 1,
			_limit: 1,
			gender: 'female',
		}),
		call(studentApi.getAll, {
			_page: 1,
			_limit: 1,
			mark_gte: 8,
		}),
		call(studentApi.getAll, {
			_page: 1,
			_limit: 1,
			mark_lte: 5,
		}),
	]);

	const statisticList = responseList.map((x) => x.pagination._totalRows);
	const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;

	yield put(
		setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount })
	);
}
function* fetchHighestStudentList() {
	// Fetch the data
	const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
		_page: 1,
		_limit: 5,
		_sort: 'mark',
		_order: 'desc',
	});

	// dispatch action to update state
	yield put(setHighestStudentList(data));
}
function* fetchLowestStudentList() {
	// Fetch the data
	const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
		_page: 1,
		_limit: 5,
		_sort: 'mark',
		_order: 'asc',
	});

	// Dispatch action to update state
	yield put(setLowestStudentList(data));
}
function* fetchRankingByCityList() {
	// Fetch city list
	const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);
	// Get students per city
	const callList = cityList.map((city) =>
		call(studentApi.getAll, {
			_page: 1,
			_limit: 5,
			_sort: 'mark',
			_order: 'asc',
			city: city.code,
		})
	);
	const responseList: Array<ListResponse<Student>> = yield all(callList);
	const rankingByCityList: Array<RankingByCity> = responseList.map(
		(x, idx) => ({
			cityId: cityList[idx].code,
			rankingList: x.data,
		})
	);
	// Update state
	yield put(setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
	try {
		// It's like Promise.all
		yield all([
			call(fetchStatistics),
			call(fetchHighestStudentList),
			call(fetchLowestStudentList),
			call(fetchRankingByCityList),
		]);

		yield put(fetchDataSuccess());
	} catch (error) {
		yield put(fetchDataFailed());
	}
}

export default function* dashboardSaga() {
	// Waiting for fetchData action.
	yield takeLatest(fetchData.type, fetchDashboardData);
}
