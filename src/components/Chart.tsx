import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, RadialLinearScale, ArcElement } from "chart.js";
import {
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
  PolarArea,
} from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement);

type Children = {
  id: string;
  title: string;
  value: number;
  color: string;
};

export type Sector = {
  id: string;
  title: string;
  value: number;
  color: string;
  children: Children[];
};

const options = {
  scales: {
    r: {
      suggestedMax: 10,
      pointLabels: {
        display: true,
        centerPointLabels: true,
        font: {
          size: 18,
        },
      },
      angleLines: {
        display: true,
      },
    },
  },
};

type Datasets = {
  data: number[];
  backgroundColor: string[];
  borderWidth: number;
};

type Data = {
  labels: string[];
  datasets: [Datasets];
};

export function Chart({ data: sectors }: { data: Sector[] }) {
  const chartRef = useRef<any>(null);
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const labels: string[] = [],
      backgroundColor: string[] = [],
      data: number[] = [];
    sectors.forEach(({ title, value, color }) => {
      labels.push(title);
      data.push(value);
      backgroundColor.push(color);
    });

    setData({
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderWidth: 1,
        },
      ],
    });
  }, [sectors]);

  return (
    data && (
      <PolarArea
        ref={chartRef}
        onClick={(event) => {
          const dataset = getDatasetAtEvent(chartRef.current, event);
          const element = getElementAtEvent(chartRef.current, event);
          const elements = getElementsAtEvent(chartRef.current, event);
          console.log(element);
          console.log(elements);
          console.log(dataset);
        }}
        options={options}
        data={data}
      />
    )
  );
}
