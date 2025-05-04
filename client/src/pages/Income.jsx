import React from "react";
import NavBar from "../components/NavBar";
import helper from "../utils/helper.js";
import { HStack, Card, Stack, Input, Field, Button } from "@chakra-ui/react";

const handleIncome = (e) => {
  e.preventDefault();
  helper.verifyLogin();

  const source = e.target.querySelector("#source").value;
  const amount = e.target.querySelector("#income").value;
  const date = e.target.querySelector("#date").value;

  if (!source || !amount || !date) {
    helper.handleError("All fields are client required! ");
    return false;
  }

  helper.sendPost(
    e.target.action,
    { source, amount, date },
    helper.handleSuccess("Income added successfully!")
  );
  return false;
};
const Income = () => {
  return (
    <>
      <HStack>
        <NavBar activeMenu={"Income"} />

        <form
          id="incomeForm"
          name="incomeForm"
          onSubmit={handleIncome}
          action="/api/addIncome"
          method="POST"
          className="mainForm object-center"
        >
          <Card.Root maxW="lg" className="">
            <Card.Header>
              <Card.Title>Add Income</Card.Title>
            </Card.Header>
            <Card.Body>
              <Stack gap="4" w="full">
                <Field.Root required>
                  <Field.Label>
                    Income Source <Field.RequiredIndicator />
                  </Field.Label>
                  <Input id="source" type="text" variant="subtle" />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    Amount <Field.RequiredIndicator />
                  </Field.Label>
                  <Input id="income" type="number" variant="subtle" />
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
                Add Income
              </Button>
            </Card.Footer>
          </Card.Root>
        </form>
      </HStack>
    </>
  );
};

export default Income;
