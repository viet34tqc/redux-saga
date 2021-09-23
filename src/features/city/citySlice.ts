import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { City, ListResponse } from '../../models';

export interface cityState {
	loading: boolean;
	cityList: City[];
}

const initialState: cityState = {
	loading: false,
	cityList: [],
};

const citySlice = createSlice({
	name: 'city',
	initialState,
	reducers: {
		fetchCity(state) {
			state.loading = true;
		},
		fetchCitySuccess(state, action: PayloadAction<ListResponse<City>>) {
			state.loading = false;
			state.cityList = action.payload.data;
		},
		fetchCityFail(state) {
			state.loading = false;
		},
	},
});

export const cityActions = citySlice.actions;

export const selectCityList = (state: RootState) => state.city.cityList;
// create a city map to convert from city code to city name
export const selectCityMap = createSelector(selectCityList, (cityList) => {
	return cityList.reduce((map: { [key: string]: City }, city) => {
		map[city.code] = city;
		return map;
	}, {});
});

export const selectCityOptions = createSelector(selectCityList, (cityList) => {
	return cityList.map((city) => ({
		label: city.name,
		value: city.code,
	}));
});

const cityReducer = citySlice.reducer;
export default cityReducer;
