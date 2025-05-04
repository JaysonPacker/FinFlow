import React, { useEffect } from "react";
import { HStack } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import DashBoard from "../components/DashBoard";
import { useState } from "react";
import helper from "../utils/helper.js";

const Home = () => {
  helper.verifyLogin();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) {
      setLoading(true);
      return;
    }
    try {
      const response = await fetch("/api/getDashboardData");
      const data = await response.json();
      setDashboardData(data);
      console.log("Dashboard data fetched successfully", data);
    } catch (error) {
      helper.handleError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <>
      <HStack>
        <NavBar activeMenu={"DashBoard"} />
        <DashBoard data={dashboardData} />
      </HStack>
    </>
  );
};

export default Home;
