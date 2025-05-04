import React from "react";
import helper from "../utils/helper.js";
import {
  Text,
  Link,
  Center,
  Heading,
  Card,
  Stack,
  Input,
  Field,
  Button,
  VStack,
} from "@chakra-ui/react";

const handleSignup = (e) => {
  e.preventDefault();

  const username = e.target.querySelector("#user").value;
  const pass = e.target.querySelector("#pass").value;
  const pass2 = e.target.querySelector("#pass2").value;

  if (!username || !pass || !pass2) {
    helper.handleError("All fields are required!");
    return false;
  }

  if (pass !== pass2) {
    helper.handleError("Passwords do not match!");
    return false;
  }

  helper.sendPost(e.target.action, { username, pass, pass2 });
  return false;
};

const Signup = () => {
  return (
    <>
      <Center className="w-screen h-screen">
        <VStack>
          <Center color="Black">
            <Heading>Welcome Back to FinFlow</Heading>
          </Center>

          <form
            id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/api/signup"
            method="POST"
            className="mainForm"
          >
            <Card.Root maxW="lg" className="">
              <Card.Header>
                <Card.Title>Sign Up</Card.Title>
                <Card.Description>
                  Enter your credentials to access your flow
                </Card.Description>
              </Card.Header>
              <Card.Body>
                <Stack gap="4" w="full">
                  <Field.Root required>
                    <Field.Label>
                      Username <Field.RequiredIndicator />
                    </Field.Label>
                    <Input id="user" type="text" variant="subtle" />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>
                      Password <Field.RequiredIndicator />
                    </Field.Label>
                    <Input id="pass" type="password" variant="subtle" />
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label>
                      Password <Field.RequiredIndicator />
                    </Field.Label>
                    <Input id="pass2" type="password" variant="subtle" />
                  </Field.Root>
                </Stack>
              </Card.Body>
              <Card.Footer>
                <Button
                  type="submit"
                  w="300px"
                  colorPalette="purple"
                  variant="subtle"
                >
                  Sign Up
                </Button>
              </Card.Footer>
            </Card.Root>
          </form>
          <Text>
            Have an Account?{" "}
            <Link variant="underline" href="/login" colorPalette="purple">
              Login
            </Link>{" "}
          </Text>
        </VStack>
      </Center>
    </>
  );
};

export default Signup;
