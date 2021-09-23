import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppSelector } from '../../../app/hooks';
import InputField from '../../../components/FormFields/InputField';
import RadioGroupField from '../../../components/FormFields/RadioGroupField';
import SelectField from '../../../components/FormFields/SelectField';
import { Student } from '../../../models';
import { selectCityOptions } from '../../city/citySlice';

interface StudentFormProps {
	initialValue: Student;
	onSubmit: (formValues: Student) => void;
}

const StudentForm = ({ initialValue, onSubmit }: StudentFormProps) => {
	const cityOptions = useAppSelector(selectCityOptions);
	const [error, setError] = useState<string>('');

	const schema = yup
		.object({
			name: yup.string().required(),
			age: yup
				.number()
				.positive()
				.min(18, 'Min is 18')
				.max(60, 'Max is 60')
				.integer()
				.required('Please enter age')
				.typeError('Please enter valid number'),
			mark: yup
				.number()
				.positive()
				.max(10)
				.required('Please enter mark')
				.typeError('Please enter valid number'),
			gender: yup
				.string()
				.oneOf(['male', 'female'])
				.required('Please select gender'),
			city: yup.string().required(),
		})
		.required();
	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm({
		defaultValues: initialValue,
		resolver: yupResolver(schema),
	});
	const handleFormSubmit = async (formsValue: Student) => {
		try {
			setError('');
			await onSubmit?.(formsValue);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<Box>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<InputField name="name" control={control} label="Full Name" />
				<RadioGroupField
					name="gender"
					control={control}
					label="Gender"
					options={[
						{ label: 'Male', value: 'male' },
						{ label: 'Female', value: 'female' },
					]}
				/>
				<SelectField
					name="city"
					control={control}
					label="City"
					options={cityOptions}
				/>
				<InputField name="age" control={control} label="Age" type="number" />
				<InputField name="mark" control={control} label="Mark" type="number" />

				{error && <Alert severity="error">{error}</Alert>}

				<Box mt={3}>
					<Button
						variant="contained"
						color="primary"
						type="submit"
						disabled={isSubmitting}
					>
						{/* Add Loading */}
						{isSubmitting && <CircularProgress size={16} color="primary" />}
						&nbsp;Save
					</Button>
				</Box>
			</form>
		</Box>
	);
};

export default StudentForm;
