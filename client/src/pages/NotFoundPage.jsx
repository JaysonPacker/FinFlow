import React from "react";
import { Status, Center } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <Center>
      <Status.Root size="lg" width="200px" colorPalette="red">
        <Status.Indicator />
        404 page not found
      </Status.Root>
    </Center>
  );
};

export default NotFoundPage;
