"use client";

import { MainLayout } from "@/components/layouts/main-layout";
import { BreedVoteForm } from "@/components/vote-form";
import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function Home() {
  return (
    <MainLayout>
      <ApolloProvider client={client}>
        <BreedVoteForm />
      </ApolloProvider>
    </MainLayout>
  );
}
