import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
	label?: string;
	value: number | string;
}

interface SelectFieldProps {
	name: string;
	control: Control<any>;
	label?: string;
	disabled?: false;
	options: SelectOption[];
}

const SelectField = ({
	name,
	control,
	label,
	disabled,
	options,
	...inputProps
}: SelectFieldProps) => {
	const {
		field: { value, onChange, onBlur },
		fieldState: { invalid, error },
	} = useController({
		name,
		control,
	});

	return (
		<FormControl
			disabled={disabled}
			variant="outlined"
			size="small"
			fullWidth
			margin="normal"
			component="fieldset"
			error={invalid}
		>
			<InputLabel id={`${name}_label`}>{label}</InputLabel>

			<Select
				labelId={`${name}_label`}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				label={label}
			>
				{options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</Select>

			<FormHelperText>{error?.message}</FormHelperText>
		</FormControl>
	);
};

export default SelectField;
