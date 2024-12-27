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

export function Chart({ refreshCharts }: { refreshCharts: number }) {
  const { data, loading, error, refetch } = useQuery(GET_RESULTS, {
    fetchPolicy: "network-only",
    pollInterval: 0,
    notifyOnNetworkStatusChange: true,
  });

  React.useEffect(() => {
    refetch();
  }, [refreshCharts, refetch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const chartData = data?.getResults.results;

  const breeds = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };

  chartData.forEach((item) => {
    if (item.breed_id in breeds) {
      breeds[item.breed_id].push(item);
    }
  });

  function calculateAge(arr) {
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum / arr.length;
  }

  function calculateMen(arr) {
    return arr.filter((item) => item === true).length;
  }

  function calculateWomen(arr) {
    return arr.filter((item) => item === false).length;
  }

  function calculateDistrict(arr, index) {
    return arr.filter((item) => item === index).length;
  }

  const pinscher = [
    {
      name: "Средний возраст",
      value: calculateAge(breeds[0].map((item) => item.age)),
    },
    {
      name: "Количество мужчин",
      value: calculateMen(breeds[0].map((item) => item.is_male)),
    },
    {
      name: "Количество женщин",
      value: calculateWomen(breeds[0].map((item) => item.is_male)),
    },
    {
      name: "ЦАО",
      value: calculateDistrict(
        breeds[0].map((item) => item.district),
        1,
      ),
    },
    {
      name: "САО",
      value: calculateDistrict(
        breeds[0].map((item) => item.district),
        2,
      ),
    },
    {
      name: "СВАО",
      value: calculateDistrict(
        breeds[0].map((item) => item.district),
        3,
      ),
    },
    {
      name: "ВАО",
      value: calculateDistrict(
        breeds[0].map((item) => item.district),
        4,
      ),
    },
  ];

  const goldenRetriever = [
    {
      name: "Средний возраст",
      value: calculateAge(breeds[1].map((item) => item.age)),
    },
    {
      name: "Количество мужчин",
      value: calculateMen(breeds[1].map((item) => item.is_male)),
    },
    {
      name: "Количество женщин",
      value: calculateWomen(breeds[1].map((item) => item.is_male)),
    },
    {
      name: "ЦАО",
      value: calculateDistrict(
        breeds[1].map((item) => item.district),
        1,
      ),
    },
    {
      name: "САО",
      value: calculateDistrict(
        breeds[1].map((item) => item.district),
        2,
      ),
    },
    {
      name: "СВАО",
      value: calculateDistrict(
        breeds[1].map((item) => item.district),
        3,
      ),
    },
    {
      name: "ВАО",
      value: calculateDistrict(
        breeds[1].map((item) => item.district),
        4,
      ),
    },
  ];

  const borderCollie = [
    {
      name: "Средний возраст",
      value: calculateAge(breeds[2].map((item) => item.age)),
    },
    {
      name: "Количество мужчин",
      value: calculateMen(breeds[2].map((item) => item.is_male)),
    },
    {
      name: "Количество женщин",
      value: calculateWomen(breeds[2].map((item) => item.is_male)),
    },
    {
      name: "ЦАО",
      value: calculateDistrict(
        breeds[2].map((item) => item.district),
        1,
      ),
    },
    {
      name: "САО",
      value: calculateDistrict(
        breeds[2].map((item) => item.district),
        2,
      ),
    },
    {
      name: "СВАО",
      value: calculateDistrict(
        breeds[2].map((item) => item.district),
        3,
      ),
    },
    {
      name: "ВАО",
      value: calculateDistrict(
        breeds[2].map((item) => item.district),
        4,
      ),
    },
  ];

  const dachshund = [
    {
      name: "Средний возраст",
      value: calculateAge(breeds[3].map((item) => item.age)),
    },
    {
      name: "Количество мужчин",
      value: calculateMen(breeds[3].map((item) => item.is_male)),
    },
    {
      name: "Количество женщин",
      value: calculateWomen(breeds[3].map((item) => item.is_male)),
    },
    {
      name: "ЦАО",
      value: calculateDistrict(
        breeds[3].map((item) => item.district),
        1,
      ),
    },
    {
      name: "САО",
      value: calculateDistrict(
        breeds[3].map((item) => item.district),
        2,
      ),
    },
    {
      name: "СВАО",
      value: calculateDistrict(
        breeds[3].map((item) => item.district),
        3,
      ),
    },
    {
      name: "ВАО",
      value: calculateDistrict(
        breeds[3].map((item) => item.district),
        4,
      ),
    },
  ];

  const vesti = [
    {
      name: "Средний возраст",
      value: calculateAge(breeds[4].map((item) => item.age)),
    },
    {
      name: "Количество мужчин",
      value: calculateMen(breeds[4].map((item) => item.is_male)),
    },
    {
      name: "Количество женщин",
      value: calculateWomen(breeds[4].map((item) => item.is_male)),
    },
    {
      name: "ЦАО",
      value: calculateDistrict(
        breeds[4].map((item) => item.district),
        1,
      ),
    },
    {
      name: "САО",
      value: calculateDistrict(
        breeds[4].map((item) => item.district),
        2,
      ),
    },
    {
      name: "СВАО",
      value: calculateDistrict(
        breeds[4].map((item) => item.district),
        3,
      ),
    },
    {
      name: "ВАО",
      value: calculateDistrict(
        breeds[4].map((item) => item.district),
        4,
      ),
    },
  ];

  const beagle = [
    {
      name: "Средний возраст",
      value: calculateAge(breeds[5].map((item) => item.age)),
    },
    {
      name: "Количество мужчин",
      value: calculateMen(breeds[5].map((item) => item.is_male)),
    },
    {
      name: "Количество женщин",
      value: calculateWomen(breeds[5].map((item) => item.is_male)),
    },
    {
      name: "ЦАО",
      value: calculateDistrict(
        breeds[5].map((item) => item.district),
        1,
      ),
    },
    {
      name: "САО",
      value: calculateDistrict(
        breeds[5].map((item) => item.district),
        2,
      ),
    },
    {
      name: "СВАО",
      value: calculateDistrict(
        breeds[5].map((item) => item.district),
        3,
      ),
    },
    {
      name: "ВАО",
      value: calculateDistrict(
        breeds[5].map((item) => item.district),
        4,
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-10 pb-36 pt-36">
      <div className="flex flex-col gap-10">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Пинчер</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pinscher}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 30]} ticks={[0, 10, 20, 30]} />
              <Tooltip />
              <Bar dataKey="value" fill="green" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Золотистый ретривер</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={goldenRetriever}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 30]} ticks={[0, 10, 20, 30]} />
              <Tooltip />
              <Bar dataKey="value" fill="blue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Бордер-колли</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={borderCollie}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 30]} ticks={[0, 10, 20, 30]} />
              <Tooltip />
              <Bar dataKey="value" fill="yellow" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Такса</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dachshund}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 30]} ticks={[0, 10, 20, 30]} />
              <Tooltip />
              <Bar dataKey="value" fill="pink" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Вести</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vesti}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 30]} ticks={[0, 10, 20, 30]} />
              <Tooltip />
              <Bar dataKey="value" fill="purple" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Бигль</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={beagle}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 30]} ticks={[0, 10, 20, 30]} />
              <Tooltip />
              <Bar dataKey="value" fill="blue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
