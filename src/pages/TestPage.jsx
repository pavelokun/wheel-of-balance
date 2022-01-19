import { Container, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Chart } from "../components/Chart";
import { Layout } from "../components/Layout";

export default function TestPage() {
  const sectors = [
    {
      id: 1,
      value: 5,
      title: "red",
      color: "rgba(255, 99, 132, 0.5)",
      children: [],
      // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      // datasets: [
      //   {
      //     label: "# of Votes",
      //     data: [12, 19, 3, 5, 2, 3],
      //     backgroundColor: [
      //       "rgba(255, 99, 132, 0.5)",
      //       "rgba(54, 162, 235, 0.5)",
      //       "rgba(255, 206, 86, 0.5)",
      //       "rgba(75, 192, 192, 0.5)",
      //       "rgba(153, 102, 255, 0.5)",
      //       "rgba(255, 159, 64, 0.5)",
      //     ],
      //     borderWidth: 1,
      //   },
      // ],
    },
  ];
  return (
    <Layout>
      <Heading>Test page</Heading>
      <Container maxW="container.lg" py={4}>
        <Text>Only for showing how redirects work, i.e. redict to or back</Text>
      </Container>
      <Chart data={sectors} />
    </Layout>
  );
}
