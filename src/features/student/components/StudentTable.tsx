import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
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
	onEdit?: (student: Student) => void;
	onRemove?: (student: Student) => void;
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

	const [open, setOpen] = React.useState(false);
	const [selectedStudent, setSelectedStudent] = React.useState<Student>();

	const handleClickRemove = (student: Student) => {
		// Open dialog
		setOpen(true);
		// Set selected student
		setSelectedStudent(student);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleRemoveDone = () => {
		// Remove student
		onRemove?.(selectedStudent as Student);

		// Close dialog
		setOpen(false)
	}

	return (
		<>
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
									<Button
										color="secondary"
										onClick={() => handleClickRemove?.(student)}
									>
										Remove
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Delete Dialog */}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Remove a student?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure to remove this student named {selectedStudent?.name}.
						<br />
						This action can&apos;t be undo.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary" variant="outlined">
						Cancel
					</Button>
					<Button
						onClick={handleRemoveDone}
						autoFocus
						color="secondary"
						variant="contained"
					>
						Remove
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default StudentTable;
