import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import studentApi from '../../../api/studentApi';
import { Student } from '../../../models';
import StudentForm from '../components/StudentForm';

const StudentAddEditPage = () => {
	const history = useHistory();
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
		city: '',
		gender: '',
		...student,
	} as Student;

	const handleStudentFormSubmit = async (formValues: Student) => {
		// We are not using try/catch here
		// If there is any error, it will be shown in StudentForm Component
		if (isEdit) {
			await studentApi.update(formValues);
		} else {
			await studentApi.add(formValues);
		}

		toast.success('Save student successfully');

		history.push('/admin/students');
	};

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

			{(!isEdit || student) && (
				<StudentForm
					initialValue={initialValue}
					onSubmit={handleStudentFormSubmit}
				/>
			)}
		</Box>
	);
};

export default StudentAddEditPage;
