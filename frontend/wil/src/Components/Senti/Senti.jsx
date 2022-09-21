import React, { Component } from "react";
import Chart from 'react-apexcharts';
import "./Senti.css";

const Senti = () => {
  const options = {
    chart: {
      type: 'donut',
    },
    colors : ['#ffeb7a', '#cac6af'],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
      }
    },
    legend: {
      show: false,
      position: 'bottom'
    },
    grid: {
      padding: {
        bottom: -80
      }
    },
    fill: {
      colors: ['#ffeb7a', '#cac6af']
    },
    labels: ['긍정이', '부정이'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
      }
    }]
  }
  const series = [44, 16];

// ChartJS.register(ArcElement, Tooltip, Legend);

// const Senti = (props) => {
    
//   const data = {
//     labels: ["부정", "긍정"],
//     datasets: [
//       {
//         label: "# of Votes",
//         data: [3, 7],
//         backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
//         borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
//         borderWidth: 1,
//       },
//     ],
//   };

  // console.log(props.user);
  return (
    <>
      <div className="Senti">
        <Chart options={options} series={series} type="donut" width="550" />
      </div>
    </>
  );
}

export default Senti;