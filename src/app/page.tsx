"use client";

import { MainLayout } from "@/components/layouts/main-layout";
import { BreedVoteForm } from "@/components/vote-form";
import { AuthAndRegistration } from "@/components/auth-reg-form";
import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { useState } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <MainLayout>
      <ApolloProvider client={client}>
      {!isAuthenticated ? (
          <AuthAndRegistration onLoginSuccess={handleLoginSuccess} />
        ) : (
          <BreedVoteForm />
        )}
      </ApolloProvider>
    </MainLayout>
  );
}
