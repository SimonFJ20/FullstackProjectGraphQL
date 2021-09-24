import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useMutation } from "urql";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";

interface RegisterProps {

}

const REGISTER_MUTATION = `
mutation Register($username: String!, $password: String!) {
  register(options: { username: $username, password: $password }) {
    errors {
      field
      message
    }
    user {
      id
      username
      createdAt
      updatedAt
    }
  }
}
`;

const register: React.FC<RegisterProps> = ({ }) => {
  const [, register] = useMutation(REGISTER_MUTATION)
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          console.log(values);
          register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              color="white"
              backgroundColor="teal"
              _hover={{ backgroundColor: 'lightgray' }}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default register;
