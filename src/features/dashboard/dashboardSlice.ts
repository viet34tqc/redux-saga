import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Student } from '../../models';

export interface DashboardStatistic {
	maleCount: number;
	femaleCount: number;
	highMarkCount: number;
	lowMarkCount: number;
}

export interface RankingByCity {
	cityId: string;
	rankingList: Student[];
}

const initialState: DashboardState = {
	loading: false,
	statistics: {
		maleCount: 0,
		femaleCount: 0,
		highMarkCount: 0,
		lowMarkCount: 0,
	},
	highestStudentList: [],
	lowestStudentList: [],
	rankingByCityList: [],
};

export interface DashboardState {
	loading: boolean;
	statistics: DashboardStatistic;
	highestStudentList: Student[];
	lowestStudentList: Student[];
	rankingByCityList: RankingByCity[];
}

const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		fetchData(state) {
			state.loading = true;
		},
		fetchDataSuccess(state) {
			state.loading = false;
		},
		fetchDataFailed(state) {
			state.loading = false;
		},

		setStatistics(state, action: PayloadAction<DashboardStatistic>) {
			state.statistics = action.payload;
		},
		setHighestStudentList(state, action: PayloadAction<Student[]>) {
			state.highestStudentList = action.payload
		},
		setLowestStudentList(state, action: PayloadAction<Student[]>) {
			state.lowestStudentList = action.payload;
		},
		setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
			state.rankingByCityList = action.payload;
		},
	},
});

export const {
	fetchData,
	fetchDataSuccess,
	fetchDataFailed,
	setStatistics,
	setHighestStudentList,
	setLowestStudentList,
	setRankingByCityList,
} = dashboardSlice.actions;

// Selectors
export const selectDashboardLoading = (state: RootState) =>
	state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) =>
	state.dashboard.statistics;
export const selectHighestStudentList = (state: RootState) =>
	state.dashboard.highestStudentList;
export const selectLowestStudentList = (state: RootState) =>
	state.dashboard.lowestStudentList;
export const selectRankingByCitylist = (state: RootState) =>
	state.dashboard.rankingByCityList;

const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
