import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useRef } from 'react';
import { City, ListParams } from '../../../models';

interface StudentFilterProps {
	filter: ListParams;
	cityList: City[];
	onChange?: (newFilter: ListParams) => void;
	onSearchChange?: (newFilter: ListParams) => void;
}

const StudentFilter = ({
	filter,
	cityList,
	onChange,
	onSearchChange,
}: StudentFilterProps) => {
    const searchRef = useRef<HTMLInputElement>();

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!onSearchChange) {
			return;
		}
		const newFilter = {
			...filter,
			_page: 1, // Reset the page
			name_like: e.target.value,
		};
		onSearchChange(newFilter);
	};

	const handleCityChange = (
		e: React.ChangeEvent<{ name?: string; value: unknown }>
	) => {
		if (!onChange) {
			return;
		}
		const newFilter = {
			...filter,
			_page: 1, // Reset the page
			city: e.target.value || undefined, // undefined param is ignored
		};
		onChange(newFilter);
	};

	const handleSortChange = (
		e: React.ChangeEvent<{ name?: string; value: unknown }>
	) => {
		if (!onChange) {
			return;
		}
		const value = e.target.value;
		const [_sort, _order] = (value as string).split('.');
		const newFilter = {
			...filter,
			_page: 1, // Reset the page
			_sort: _sort || undefined,
			_order: (_order as 'asc' | 'desc') || undefined,
		};
		onChange(newFilter);
	};

	const handleClearFilter = () => {
		if (!onChange) return;

		const newFilter: ListParams = {
			...filter,
			_page: 1,
			_sort: undefined,
			_order: undefined,
			city: undefined,
			name_like: undefined,
		};
		onChange(newFilter);

        // Empty search input.
		if (searchRef.current) {
			searchRef.current.value = '';
		}
	};

	return (
		<Box mb={4}>
			{/* Search */}
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth variant="outlined" size="small">
						<InputLabel htmlFor="searchByName">Search by name</InputLabel>
						<OutlinedInput
							id="searchByName"
							label="Search by name"
							endAdornment={<Search />}
							onChange={handleSearchChange}
                            inputRef={searchRef}
						/>
					</FormControl>
				</Grid>

				{/* Filter by city */}
				<Grid item xs={12} md={6} lg={3}>
					<FormControl variant="outlined" size="small" fullWidth>
						<InputLabel id="filterByCity">Filter by city</InputLabel>
						<Select
							labelId="filterByCity"
							value={filter.city || ''}
							onChange={handleCityChange}
							label="Filter by city"
						>
							<MenuItem value="">
								<em>All</em>
							</MenuItem>

							{cityList.map((city) => (
								<MenuItem key={city.code} value={city.code}>
									{city.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				{/* Sort */}
				<Grid item xs={12} md={6} lg={2}>
					<FormControl variant="outlined" size="small" fullWidth>
						<InputLabel id="sortBy">Sort</InputLabel>
						<Select
							labelId="sortBy"
							value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
							onChange={handleSortChange}
							label="Sort"
						>
							<MenuItem value="">
								<em>No sort</em>
							</MenuItem>

							<MenuItem value="name.asc">Name ASC</MenuItem>
							<MenuItem value="name.desc">Name DESC</MenuItem>
							<MenuItem value="mark.asc">Mark ASC</MenuItem>
							<MenuItem value="mark.desc">Mark DESC</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} md={6} lg={1}>
					<Button
						variant="outlined"
						color="primary"
						fullWidth
						onClick={handleClearFilter}
					>
						Clear
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};
export default StudentFilter;
