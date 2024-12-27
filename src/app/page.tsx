"use client";

import { MainLayout } from "@/components/layouts/main-layout";
import { BreedVoteForm } from "@/components/vote-form";
import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { Chart } from "@/components/chart";
import { useState } from "react";

export default function Home() {
  const [refreshCharts, setRefreshCharts] = useState(0);

  const handleFormSubmit = () => {
    setRefreshCharts((prev) => prev + 1);
  };

  return (
    <MainLayout>
      <ApolloProvider client={client}>
        <BreedVoteForm onSubmitSuccess={handleFormSubmit} />
        <Chart refreshCharts={refreshCharts} />
      </ApolloProvider>
    </MainLayout>
  );
}
