import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2"; // npm install react-chartjs-2 chart.js
import "./Senti.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Senti = () => {
    
  const data = {
    labels: ["부정", "긍정"],
    datasets: [
      {
        label: "# of Votes",
        data: [3, 7],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="senti">
      <Doughnut data={data} />;
      <h1>감정 분석 결과</h1>
    </div>
  );

};

export default Senti;