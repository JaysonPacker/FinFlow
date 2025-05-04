import React from "react";
import InfoCard from "./InfoCard";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import {
  Flex,
  HStack,
  VStack,
  Button,
  Card,
  Text,
  Center,
  Circle,
  Box,
} from "@chakra-ui/react";
import TransactionCard from "./TransactionCard";

const DashBoard = ({ data }) => {
  console.log("Dashboard data", data?.totalBalance);
  return (
    <>
      <VStack gap="4" align="start" maxW="60vw">
        <Flex gap="4" wrap="wrap" maxW="60vw" direction="row">
          <InfoCard
            icon={<BsFillCreditCard2FrontFill />}
            label="Total Balance"
            value={data?.totalBalance || 0}
            color="purple"
          />
          <InfoCard
            icon={<FaMoneyBillTrendUp />}
            label="Total Income"
            value={data?.totalIncome || 0}
            color="green"
          />
          <InfoCard
            icon={<GiPayMoney />}
            label="Total Expense"
            value={data?.totalExpense || 0}
            color="red.700"
          />
        </Flex>

        <Card.Root w="60vw">
          <Card.Header>
            <HStack gap="20vw">
              <Card.Title>Recent Transactions</Card.Title>
            </HStack>
          </Card.Header>
          <Card.Body gap="2" wrap="wrap" w="100%" direction="row">
            {data?.recentTransactions?.slice(0, 5).map((item) => {
              return (
                <TransactionCard
                  key={item._id}
                  icon={
                    item.type === "income" ? (
                      <FaMoneyBillTrendUp />
                    ) : (
                      <GiPayMoney />
                    )
                  }
                  label={item.source}
                  value={item.amount}
                  color={item.type === "income" ? "green" : "red.700"}
                />
              );
            })}
          </Card.Body>
        </Card.Root>
      </VStack>
    </>
  );
};

export default DashBoard;
