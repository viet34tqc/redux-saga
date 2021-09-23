import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import studentApi from '../../../api/studentApi';
import { Student } from '../../../models';
import StudentForm from '../components/StudentForm';

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
			} catch (error) {}
		})();
	}, [studentId]);

	const initialValue = {
		name: '',
		age: '',
		mark: '',
		gender: '',
		...student,
	} as Student;

	const handleStudentFormSubmit = (formValues: Student) => {

	}

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

			{/* We need to check if this is add form or edit form */}
			{/* If edit form, we need to wait for the student data to be retrieved */}

			{
				(!isEdit || student) && <StudentForm initialValue={initialValue} onSubmit={handleStudentFormSubmit} />
			}
		</Box>
	);
};

export default StudentAddEditPage;
