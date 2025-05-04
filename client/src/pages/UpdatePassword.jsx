import React from "react";
import NavBar from "../components/NavBar";
import helper from "../utils/helper.js";
import { HStack, Card, Stack, Input, Field, Button } from "@chakra-ui/react";

const handleUpdate = (e) => {
  e.preventDefault();
  helper.verifyLogin();

  const oldPass = e.target.querySelector("#oldPass").value;
  const newPass = e.target.querySelector("#newPass").value;
  const newPass2 = e.target.querySelector("#newPass2").value;

  if (!oldPass || !newPass || !newPass2) {
    helper.handleError("All fields are client required! ");
    return false;
  }

  helper.sendPost(
    e.target.action,
    { oldPass, newPass, newPass2 },
    helper.handleSuccess("Password Updated successfully!")
  );
  return false;
};
const UpdatePassword = () => {
  helper.verifyLogin();

  return (
    <>
      <HStack>
        <NavBar activeMenu={"Update Password"} />

        <form
          id="passwordForm"
          name="passwordForm"
          onSubmit={handleUpdate}
          action="/api/updatePassword"
          method="POST"
          className="mainForm object-center"
        >
          <Card.Root maxW="lg" className="">
            <Card.Header>
              <Card.Title>Update Password</Card.Title>
            </Card.Header>
            <Card.Body>
              <Stack gap="4" w="full">
                <Field.Root required>
                  <Field.Label>
                    OldPassword <Field.RequiredIndicator />
                  </Field.Label>
                  <Input id="oldPass" type="text" variant="subtle" />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    New Password <Field.RequiredIndicator />
                  </Field.Label>
                  <Input id="newPass" type="text" variant="subtle" />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    Retype New Password <Field.RequiredIndicator />
                  </Field.Label>
                  <Input id="newPass2" type="text" variant="subtle" />
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
                Update
              </Button>
            </Card.Footer>
          </Card.Root>
        </form>
      </HStack>
    </>
  );
};

export default UpdatePassword;
