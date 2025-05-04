import React from "react";
import NavBar from "../components/NavBar";
import helper from "../utils/helper.js";
import {
  Text,
  Link,
  Center,
  HStack,
  Card,
  Stack,
  Input,
  Field,
  Button,
} from "@chakra-ui/react";

const handleExpense = (e) => {
  e.preventDefault();
  helper.verifyLogin();

  const source = e.target.querySelector("#source").value;
  const amount = e.target.querySelector("#expense").value;
  const date = e.target.querySelector("#date").value;

  if (!source || !amount || !date) {
    helper.handleError("All fields are client required! ");
    return false;
  }

  helper.sendPost(
    e.target.action,
    { source, amount, date },
    helper.handleSuccess("Expense added successfully!")
  );
  return false;
};
const Expense = () => {
  return (
    <>
      <HStack>
        <NavBar activeMenu={"Expense"} />

        <form
          id="expenseForm"
          name="expenseForm"
          onSubmit={handleExpense}
          action="/api/addExpense"
          method="POST"
          className="mainForm object-center"
        >
          <Card.Root maxW="lg" className="">
            <Card.Header>
              <Card.Title>Add Expense</Card.Title>
            </Card.Header>
            <Card.Body>
              <Stack gap="4" w="full">
                <Field.Root required>
                  <Field.Label>
                    Expense Source <Field.RequiredIndicator />
                  </Field.Label>
                  <Input id="source" type="text" variant="subtle" />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    Amount <Field.RequiredIndicator />
                  </Field.Label>
                  <Input id="expense" type="number" variant="subtle" />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    Date <Field.RequiredIndicator />
                  </Field.Label>
                  <Input id="date" type="date" variant="subtle" />
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
                Add Expense
              </Button>
            </Card.Footer>
          </Card.Root>
        </form>
      </HStack>
    </>
  );
};

export default Expense;
