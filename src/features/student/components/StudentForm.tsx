import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@material-ui/core';
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
	const { control, handleSubmit } = useForm({
		defaultValues: initialValue,
		resolver: yupResolver(schema),
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
