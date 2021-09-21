import {
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
import { Student } from '../../../models';

interface StudentTableProps {
	studentList: Student[];
	onEdit?: (student: Student) => {};
	onRemove?: (student: Student) => {};
}

const useStyles = makeStyles((theme) => ({
	table: {},
	edit: {
		marginRight: theme.spacing(1),
	},
}));

const StudentTable = ({ studentList, onEdit, onRemove }: StudentTableProps) => {
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
							<TableCell>{student.gender}</TableCell>
							<TableCell>{student.mark}</TableCell>
							<TableCell>{student.city}</TableCell>
							<TableCell align="right">
								<Button
									variant="contained"
									color="primary"
									onClick={() => onEdit?.(student)}
									className={classes.edit}
								>
									Edit
								</Button>
								<Button
									variant="outlined"
									color="secondary"
									onClick={() => onRemove?.(student)}
								>
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
