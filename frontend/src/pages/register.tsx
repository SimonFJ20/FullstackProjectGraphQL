import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import Wrapper from "../components/Wrapper";

interface RegisterProps {

}

const register: React.FC<RegisterProps> = ({ }) => {
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={(values) => { console.log(values); }}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input
                                value={values.username}
                                onChange={handleChange}
                                id="username"
                                placeholder="username"
                            />
                            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                        </FormControl>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default register;
