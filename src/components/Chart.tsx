import React, { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, RadialLinearScale, ArcElement } from "chart.js";
import {
  // getDatasetAtEvent,
  // getElementAtEvent,
  // getElementsAtEvent,
  PolarArea,
} from "react-chartjs-2";
import { Sector } from "../types";

ChartJS.register(RadialLinearScale, ArcElement);

const options = {
  scales: {
    r: {
      suggestedMax: 10,
      pointLabels: {
        display: true,
        centerPointLabels: true,
        font: {
          size: 18,
          // weight: "bold",
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

type Wheel = {
  id: string;
  sectors: Sector[];
};

function ChartComponent({ data: wheel }: { data: Wheel }) {
  const chartRef = useRef<any>(null);
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const labels: string[] = [],
      backgroundColor: string[] = [],
      data: number[] = [];
    wheel.sectors.forEach(({ title, value, color }) => {
      labels.push(title);
      data.push(value);
      backgroundColor.push(`rgba(${color}, 0.6)`);
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
  }, [wheel.sectors]);

  return (
    data && (
      <PolarArea
        ref={chartRef}
        // onClick={(event) => {
        //   const dataset = getDatasetAtEvent(chartRef.current, event);
        //   const element = getElementAtEvent(chartRef.current, event);
        //   const elements = getElementsAtEvent(chartRef.current, event);
        //   console.log(element);
        //   console.log(elements);
        //   console.log(dataset);
        // }}
        options={options}
        data={data}
      />
    )
  );
}

export const Chart = React.memo(ChartComponent);
