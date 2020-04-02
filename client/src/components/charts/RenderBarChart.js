import React, { PureComponent, Fragment,useState,useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import {getChartData} from '../../actions/chart';
import Loading from '../layout/Loading';
import CustomizedAxisTick from './CustomizedAxisTick'
import CustomizedLabel from './CustomizedLabel'






const RenderBarChart = ({chart}) => {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  
const [chartData, setChartData] = useState({
  type: 'Bar',
  data: "",
  title:""

})

const loadData = async () =>{

  const res = await getChartData(chart._id);
  console.log(res);
  setChartData({...chartData, data:res.data,title:res.title});
  
}

useEffect(  () => {

  loadData()
  const interval = setInterval( async() => {
    loadData();
  }, 5000);
  return () => clearInterval(interval);
}, []);

const {data,title} = chartData;

if (!data) return <Loading/>

    return (
      <div className='post'	>
      <h2>{title}</h2>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      > 
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} interval={0}/>
        <YAxis />
        <Tooltip />
        
        <Bar dataKey="value" fill="#8884d8" />

      </BarChart>
      </div>
    );
  }

  export default RenderBarChart
