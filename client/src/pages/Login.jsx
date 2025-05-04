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

const handleLogin = (e) => {
  e.preventDefault();

  const username = e.target.querySelector("#user").value;
  const pass = e.target.querySelector("#pass").value;

  if (!username || !pass) {
    helper.handleError("Username or password is empty");
    return false;
  }

  helper.sendPost(e.target.action, { username, pass });
  return false;
};

const Login = () => {
  return (
    <>
      <Center className="w-screen h-screen">
        <VStack>
          <Center color="Black">
            <Heading>Welcome Back to FinFlow</Heading>
          </Center>

          <form
            id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/api/login"
            method="POST"
            className="mainForm object-center"
          >
            <Card.Root maxW="lg" className="">
              <Card.Header>
                <Card.Title>Login</Card.Title>
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
                </Stack>
              </Card.Body>
              <Card.Footer>
                <Button
                  type="submit"
                  colorPalette="purple"
                  variant="subtle"
                  w="300px"
                >
                  Login
                </Button>
              </Card.Footer>
            </Card.Root>
          </form>
          <Text>
            No Account?{" "}
            <Link variant="underline" href="/signup" colorPalette="purple">
              SignUp
            </Link>{" "}
          </Text>
        </VStack>
      </Center>
    </>
  );
};

export default Login;
