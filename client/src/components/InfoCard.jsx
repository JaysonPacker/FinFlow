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
const InfoCard = ({ icon, label, value, color }) => {
  return (
    <>
      <Card.Root flexDirection="row" variant={"elevated"} p="4" maxW="600px">
        <Center>
          <Circle size="10" bg={color} color="white" fontSize="xl">
            {icon}
          </Circle>
        </Center>
        <Card.Body color="fg.muted">
          <VStack>
            <Heading size="md"> {label}</Heading>
            <Text textStyle="4xl">
              <FormatNumber value={value} style="currency" currency="USD" />
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default InfoCard;
