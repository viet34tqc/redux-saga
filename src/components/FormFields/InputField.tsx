import { TextField } from '@material-ui/core';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	control: Control<any>;
	label?: string;
}

const InputField = ({
	name,
	control,
	label,
	...inputProps
}: InputFieldProps) => {
	const {
		field: { value, onChange, onBlur, ref },
		fieldState: { invalid, error },
	} = useController({
		name,
		control,
	});
	return (
		<TextField
			label={label}
			variant="outlined"
			fullWidth
			margin="normal"
            value={value}
			onChange={onChange}
			onBlur={onBlur}
			inputRef={ref}
			error={invalid}
			helperText={error?.message}
			inputProps={inputProps}
		/>
	);
};

export default InputField;
