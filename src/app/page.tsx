"use client";

import React from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { BreedVoteForm } from "@/components/vote-form";
import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function Home() {
  return (
    <MainLayout
      onLogout={() => {
        console.log("До свидания!");
      }}
    >
      <ApolloProvider client={client}>
        <BreedVoteForm />
      </ApolloProvider>
    </MainLayout>
  );
}
