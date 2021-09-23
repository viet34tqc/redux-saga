import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import studentApi from '../../../api/studentApi';
import { Student } from '../../../models';

const StudentAddEditPage = () => {
	const { studentId } = useParams<{ studentId: string }>();
	const isEdit = Boolean(studentId);
	const [student, setStudent] = useState<Student>();

	// Get student if there is studentId
	useEffect(() => {
		if (!studentId) return;

		(async () => {
			try {
				const student: Student = await studentApi.getById(studentId);
				setStudent(student);
			} catch (error) {

            }
		})();
	}, [studentId]);

	return (
		<Box>
			<Link to="/admin/students">
				<Typography
					variant="caption"
					style={{ display: 'flex', alignItems: 'center' }}
				>
					<ChevronLeft /> Back to student list
				</Typography>
			</Link>

			<Typography variant="h4">
				{isEdit ? 'Update student info' : 'Add new student'}
			</Typography>
		</Box>
	);
};

export default StudentAddEditPage;
