import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement>

const InputField: React.FC<InputFieldProps> = (props) => {
    const [] = useField(props);
    return (
        <FormControl isInvalid={form.errors.name && form.touched.name}>
            <FormLabel htmlFor="name">First name</FormLabel>
            <Input {...field} id="name" placeholder="name" />
            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
    );
}

export default InputField;
