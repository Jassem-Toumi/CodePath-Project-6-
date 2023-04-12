import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box maxW="100vw" p={4}>
      <Flex justify="flex-end">
        <Link to="/">
          <Button colorScheme="green" mb={4}>Home</Button>
        </Link>
      </Flex>
      <Outlet />
    </Box>
  );
};

export default Layout;
