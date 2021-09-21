import {
	Box,
	FormControl,
	Grid,
	InputLabel,
	OutlinedInput,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParams } from '../../../models';

interface StudentFilterProps {
	filter: ListParams;
	cityList: City[];
	onChange?: (newFilter: ListParams) => void;
	onSearchChange?: (newFilter: ListParams) => void;
}

const StudentFilter = ({filter, onSearchChange}: StudentFilterProps) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if ( !onSearchChange ) {
            return;
        }
        const newFilter = {
            ...filter,
            name_like: e.target.value
        }
        onSearchChange(newFilter);
    }
	return (
		<Box mb={4}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth variant="outlined" size="small">
						<InputLabel htmlFor="searchByName">Search by name</InputLabel>
						<OutlinedInput
							id="searchByName"
							label="Search by name"
							endAdornment={<Search />}
                            onChange={handleSearchChange}
						/>
					</FormControl>
				</Grid>
			</Grid>
		</Box>
	);
};

export default StudentFilter;
