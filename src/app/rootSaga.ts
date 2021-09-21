import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/authSaga';
import dashboardSaga from '../features/dashboard/dashboardSaga';

export default function* rootSaga() {
	yield all([authSaga(), dashboardSaga()]);
}
