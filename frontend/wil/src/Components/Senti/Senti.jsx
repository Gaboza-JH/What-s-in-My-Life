import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import senti0 from "../../static/img/senti01.png"
import senti1 from '../../static/img/senti11.png';
import "./Senti.css";

const Senti = (props) => {
  const postIdIndex = props.user.postIdList;
  // const [postList, setPostList] = useState();
  const [sentiN, setSenti0] = useState(null);
  const [sentiP, setSenti1] = useState(null);
  const [error, setError] = useState(null);

  const options = {
    chart: {
      type: 'donut',
    },
    colors: ['#ffeb7a', '#cac6af'],
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
  const series = [sentiN, sentiP];

  // chart값 뿌려주기 
  const fetchSenti = async () => {
    // const sentis = [];
    const sentiN = [];
    const sentiP = [];
    try {
      for (let index = 1; index <= postIdIndex.length; index++) {
        const response = await axios.get(
          `http://localhost:8080/post/${index}`
        );
        if (response.data.senti == 0) {
          sentiN.push(response.data.senti)
          console.log(sentiN.length)
          setSenti0(sentiN.length)
        } else {
          sentiP.push(response.data.senti)
          console.log(sentiP.length)
          setSenti1(sentiP.length)
        }
      }
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
  }

  useEffect(() => {
    fetchSenti();
  }, []);


  return (
    <>
      <a>aavs</a>
      <div className="Senti">
        <div className="Sentilist">
            <img className="SentiItem1" src={senti1} />
            <img className="SentiItem0" src={senti0} />
        </div>
        <Chart options={options} series={series} type="donut" width="550" />
          {/* <div className="Sentilist">
            <img className="SentiItem1" src={senti1} />
            <img className="SentiItem0" src={senti0} />
          </div> */}
      </div>
    </>
  );
};

export default Senti;