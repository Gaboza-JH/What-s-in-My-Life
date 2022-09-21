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


  return (
    <>
      <div className="Senti">
        <Chart options={options} series={series} type="donut" width="550" />
      </div>
    </>
  );
}

export default Senti;