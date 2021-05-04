import React, { useEffect } from 'react';


export default function TextField(props: any) {
    const { type, label, registerName, register, errors } = props;

    useEffect(() => {
        console.log(register);
    }, [])

    return (
        <TextField
            type={type}
            variant="outlined"
            margin="normal"
            fullWidth
            id={registerName}
            label={label}
            autoComplete={registerName}
            autoFocus
            {...register(registerName)}
            required={errors[registerName] ? true : false}
            error={errors[registerName] ? true : false}
            helperText={errors[registerName] && errors[registerName].message}
        />
    )

}