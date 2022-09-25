import { getByDisplayValue } from "@testing-library/react";
import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import sentinone from "../../static/img/sentinone.png"
import senti0 from "../../static/img/senti01.png"
import senti1 from '../../static/img/senti11.png';
import "./Senti.css";

const Senti = (props) => {
  const postIdIndex = props.user.postIdList;
  // const [postList, setPostList] = useState();
  const [sentiN, setSentiN] = useState(0);
  const [sentiP, setSentiP] = useState(0);
  const [error, setError] = useState(null);

  const options = {
    chart: {
      type: 'donut',
    },
    colors: ['#cac6af', '#ffeb7a'],
    plotOptions: {
      pie: {
        expandOnClick: false,
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
    total: {
      showAlways: false,
    },
    fill: {
      colors: ['#cac6af', '#ffeb7a'],
    },
    labels: ['부정이', '긍정이'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
      }
    }]
  }
  
  const series = [sentiP, sentiN];
  // var chart = new Chart(document.querySelector(".Senti"), options);
  // chart.render();

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
          console.log(response.data.Senti)
          sentiN.push(response.data.senti)
          setSentiN(sentiN.length)
        } else {
          sentiP.push(response.data.senti)
          setSentiP(sentiP.length)
        }
      }
      console.log("0값 : " + sentiN.length);
      console.log("1값 : " + sentiP.length);
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
      <div className="Senti">
        <div className="Sentilist">
          <img className= "SentiItem" src={postIdIndex.length ? senti1 : sentinone} onError={sentinone}/>
          <img className= "SentiItem" src={postIdIndex.length ? senti0 : sentinone} onError={sentinone}/>
        </div>
        <Chart options={options} series={series} type="donut" width="550" />
      </div>
    </>
  );
};


export default Senti;