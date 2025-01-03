"use client";

import React, { useState, useEffect, CSSProperties } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { AuthAndRegistration } from "@/components/auth-reg-form";
import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { gql, useLazyQuery } from "@apollo/client";
import { Chart } from "../../components/chart";
import useStore from "@/store";
import { IUser } from "@/lib/types";

const GET_ME_QUERY = gql`
  query GetMe {
    getMe {
      status
      user {
        _id
        name
        email
        role
        createdAt
        updatedAt
      }
    }
  }
`;

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const store = useStore();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    store.authUser = null;
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
  };

  const AuthenticatedContent = () => {
    const [getMe] = useLazyQuery(GET_ME_QUERY, {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (data?.getMe?.status === "success") {
          setIsAuthenticated(true);
          store.setAuthUser(data.getMe.user as IUser);
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false);
      },
      onError: (err) => {
        if (localStorage.getItem("access_token") === null) {
          console.log("Токен отсутствует. Пользователь не авторизован.");
        } else {
          console.error("Ошибка проверки авторизации:", err);
        }
        setIsAuthenticated(false);
        setLoading(false);
      },
    });

    if (loading) {
      const styles: { [key: string]: CSSProperties } = {
        loadingContainer: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f8f9fa",
        },
        spinner: {
          width: "50px",
          height: "50px",
          border: "5px solid #ddd",
          borderTop: "5px solid #007bff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        },
        loadingText: {
          marginTop: "16px",
          fontSize: "18px",
          color: "#333",
        },
      };

      const globalStyles = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;

      if (typeof window !== "undefined") {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = globalStyles;
        document.head.appendChild(styleSheet);
      }

      useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.log("Токен отсутствует. Ожидаем авторизации пользователя.");
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        getMe();
      }, [getMe]);

      return (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Загрузка...</p>
        </div>
      );
    }

    return !isAuthenticated ? (
      <AuthAndRegistration onLoginSuccess={handleLoginSuccess} />
    ) : (
      <Chart />
    );
  };

  return (
    <MainLayout onLogout={handleLogout} onLogin={isAuthenticated} >
      <ApolloProvider client={client}>
        <AuthenticatedContent />
      </ApolloProvider>
    </MainLayout>
  );
}
