import React, {useState, useEffect} from 'react'; 
import moment from 'moment'; 
import zoomPlugin from 'chartjs-plugin-zoom';
import _ from 'lodash'; 


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
)

const LineChart = (props) => {

  const myDateArray = props.allData.map(array => array.timestamp); 
  const myIndexValue = props.allData.map(array => array.value); 
  const btcClosePrice = props.allData.map(array => array.closePrice.toFixed(2) / 1000);
  const ethHistoricalData = props.ethHistoricalData.map(array => array.closePrice.toFixed(2) / 100);

  const data = {

    labels: myDateArray,
    datasets: [
      {
        label: "Fear & Greed Index",
        data: myIndexValue,
        fill: true,
        backgroundColor: "#aa0000",
        borderColor: "#aa0000"
      },
      {
        label: "Bitcoin Price USD in Thousands",
        data: btcClosePrice,
        fill: true,
        backgroundColor: "#b8d3f4",
        borderColor: "#b8d3f4"
      }
    ] 
  };

  return(
    <div>
      <Line
      data={data} 
      />
    </div>
  )

}

export default LineChart; 