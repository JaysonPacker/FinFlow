import React from "react";
import {
  Center,
  Circle,
  Card,
  Heading,
  FormatNumber,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";
const TransactionCard = ({ icon, label, value, color }) => {
  return (
    <>
      <Card.Root flexDirection="row" variant={"elevated"} p="4" maxW="100%">
        <Center>
          <Circle size="8" bg={color} color="white" fontSize="lg">
            {icon}
          </Circle>
        </Center>
        <Card.Body color="fg.muted">
          <VStack>
            <Heading size="md" textStyle="lg">
              {" "}
              {label}
            </Heading>
            <Text textStyle="md">
              <FormatNumber value={value} style="currency" currency="USD" />
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default TransactionCard;
