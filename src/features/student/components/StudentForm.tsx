import { Box, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
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
	const { control, handleSubmit } = useForm({
		defaultValues: initialValue,
	});
	const handleFormSubmit = (formsValue: Student) => {
		console.log('formsValue', formsValue);
		onSubmit(formsValue);
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

				<Box mt={3}>
					<Button variant="contained" color="primary" type="submit">
						Save
					</Button>
				</Box>
			</form>
		</Box>
	);
};

export default StudentForm;
