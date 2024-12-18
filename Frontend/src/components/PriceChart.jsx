/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function PriceChart({ candles }) {
  const { priceChange } = useMemo(() => {
    if (candles && candles.length > 1) {
      const latestCandle = candles[candles.length - 1];
      const previousCandle = candles[candles.length - 2];

      const change = latestCandle.endPrice - previousCandle.endPrice;
      const percentage = (change / previousCandle.endPrice) * 100;

      return {
        percentageChange: percentage,
      };
    }
    return { currentPrice: "N/A", priceChange: 0, percentageChange: "N/A" };
  }, [candles]);

  // Chart configuration
  const chartData = useMemo(
    () => ({
      labels: candles.map((candle) =>
        new Date(candle.dateTime).toLocaleDateString()
      ),
      datasets: [
        {
          label: "Price",
          data: candles.map((candle) => candle.endPrice),
          borderColor: priceChange >= 0 ? "#10B981" : "#EF4444",
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;

            const gradient = ctx.createLinearGradient(
              0,
              chartArea.bottom,
              0,
              chartArea.top
            );
            gradient.addColorStop(
              0,
              priceChange >= 0
                ? "rgba(16, 185, 129, 0.1)"
                : "rgba(239, 68, 68, 0.1)"
            );
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
            return gradient;
          },
          fill: true,
          tension: 0.4,
        },
      ],
    }),
    [candles, priceChange]
  );
  return (
    <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6">
      {candles.length > 1 ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: false,
                grid: { color: "#f3f4f6" },
              },
              x: {
                grid: { display: false },
              },
            },
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Nicht genügend Daten zur Anzeige
        </div>
      )}
    </div>
  );
}
