"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { gql, useQuery } from "@apollo/client";
import React from "react";

// Определяем типы для данных результата
interface Result {
  _id: string;
  breed_id: number;
  district: number;
  name: string;
  is_male: boolean;
  age: number;
  createdAt: string;
}

interface GetResultsResponse {
  getResults: {
    status: string;
    totalResults: number;
    results: Result[];
  };
}

const GET_RESULTS = gql`
  query GetResults {
    getResults {
      status
      totalResults
      results {
        _id
        breed_id
        district
        name
        is_male
        age
        createdAt
      }
    }
  }
`;

// Определяем типы для статистики по породам
interface BreedStatistics {
  averageAge: number;
  maleCount: number;
  femaleCount: number;
  districtCount: number[];
}

const calculateStatistics = (data: Result[]): BreedStatistics => {
  const ageSum = data.reduce((sum, item) => sum + item.age, 0);
  const maleCount = data.filter(item => item.is_male).length;
  const femaleCount = data.filter(item => !item.is_male).length;

  const districtCount = Array(4).fill(0); // Предполагаем 4 района
  data.forEach(item => {
    if (item.district >= 1 && item.district <= 4) {
      districtCount[item.district - 1]++;
    }
  });

  return {
    averageAge: data.length ? ageSum / data.length : 0,
    maleCount,
    femaleCount,
    districtCount,
  };
};

interface ChartProps {
  refreshCharts?: number;
}

export function Chart({ refreshCharts }: ChartProps) {
  const { data, loading, error, refetch } = useQuery<GetResultsResponse>(GET_RESULTS, {
    fetchPolicy: "network-only",
    pollInterval: 0,
    notifyOnNetworkStatusChange: true,
  });

  React.useEffect(() => {
    if (refreshCharts) {
      refetch();
    }
  }, [refreshCharts, refetch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const chartData = data?.getResults.results || []; // Добавлено значение по умолчанию
  const breeds: Result[][] = Array.from({ length: 6 }, () => []);

  chartData.forEach(item => {
    if (item.breed_id >= 0 && item.breed_id < breeds.length) {
      breeds[item.breed_id].push(item);
    }
  });

  const breedNames = ["Пинчер", "Золотистый ретривер", "Бордер-колли", "Такса", "Вести", "Бигль"];
  const colors = ["green", "blue", "yellow", "pink", "purple", "blue"];

  return (
    <div className="flex flex-col gap-10 pb-36 pt-36">
      {breeds.map((breedData, index) => {
        const stats = calculateStatistics(breedData);
        const districtNames = ["ЦАО", "САО", "СВАО", "ВАО"];
        const districtValues = districtNames.map((_, i) => stats.districtCount[i] || 0);

        return (
          <div key={index} className="flex flex-col gap-10">
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">{breedNames[index]}</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: "Средний возраст", value: stats.averageAge },
                  { name: "Количество мужчин", value: stats.maleCount },
                  { name: "Количество женщин", value: stats.femaleCount },
                  ...districtNames.map((name, i) => ({ name, value: districtValues[i] })),
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 30]} ticks={[0, 10, 20, 30]} />
                  <Tooltip />
                  <Bar dataKey="value" fill={colors[index]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}