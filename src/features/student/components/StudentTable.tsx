import {
	Box,
	Button,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import React from 'react';
import { City, Student } from '../../../models';
import { capitalizeFirstLetter, changeMarkColor } from '../../../utils/common';

interface StudentTableProps {
	studentList: Student[];
	cityMap: { [key: string]: City };
	onEdit?: (student: Student) => {};
	onRemove?: (student: Student) => {};
}

const useStyles = makeStyles((theme) => ({
	table: {},
	edit: {
		marginRight: theme.spacing(1),
	},
}));

const StudentTable = ({
	studentList,
	cityMap,
	onEdit,
	onRemove,
}: StudentTableProps) => {
	const classes = useStyles();
	return (
		<TableContainer>
			<Table size="small" aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Gender</TableCell>
						<TableCell>Mark</TableCell>
						<TableCell>City</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{studentList.map((student, idx) => (
						<TableRow key={student.id}>
							<TableCell>{idx + 1}</TableCell>
							<TableCell>{student.name}</TableCell>
							<TableCell>{capitalizeFirstLetter(student.gender)}</TableCell>
							<TableCell>
								<Box color={changeMarkColor(Number(student.mark))}>
									{student.mark}
								</Box>
							</TableCell>
							<TableCell>{cityMap[student.city]?.name}</TableCell>
							<TableCell align="right">
								<Button
									color="primary"
									onClick={() => onEdit?.(student)}
									className={classes.edit}
								>
									Edit
								</Button>
								<Button color="secondary" onClick={() => onRemove?.(student)}>
									Remove
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default StudentTable;
