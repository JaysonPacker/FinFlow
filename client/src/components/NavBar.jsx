import React from "react";
import { Card, Button, VStack, Link, Center } from "@chakra-ui/react";
import helper from "../utils/helper.js";

const NavBar = ({ activeMenu }) => {
  const menuItems = [
    { name: "DashBoard", path: "/home" },
    { name: "Income", path: "/income" },
    { name: "Expenses", path: "/expenses" },
  ];

  const handleLogout = () => {
    // Perform logout logic here, such as clearing tokens or redirecting to the login page
    helper.sendPost("/api/logout", {});
  };
  return (
    <>
      <Card.Root w="30vw">
        <Card.Body gap="2">
          <Card.Header>
            <Card.Title>FinFlow</Card.Title>
            <Card.Description>Manage your flow</Card.Description>
          </Card.Header>
          <ul>
            {" "}
            <VStack gap="3" w="100%">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Button
                    asChild
                    colorPalette="purple"
                    variant={activeMenu === item.name ? "solid" : "Plain"}
                    w="100%"
                  >
                    <a href={item.path}>{item.name}</a>
                  </Button>
                </li>
              ))}
            </VStack>{" "}
          </ul>
        </Card.Body>
        <Card.Footer>
          <Center>
            {" "}
            <Button
              type="submit"
              colorPalette="purple"
              variant="outline"
              w="100%"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Center>
        </Card.Footer>
      </Card.Root>
    </>
  );
};

export default NavBar;
