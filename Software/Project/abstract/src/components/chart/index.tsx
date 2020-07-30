import React from 'react';
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
  Legend,
} from 'recharts';
import { timeList } from '@/state/xState';
import { range } from 'lodash';
import { useLocalStorage } from '@rehooks/local-storage';

type IData = {
  div: number;
  emotion10: number;
  emotion11: number;
  name: typeof timeList[number];
};

export default function Chart() {
  const [divData] = useLocalStorage<number[]>('div', []);
  const [emotion10Data] = useLocalStorage<number[]>('emotion10', []);
  const [emotion11Data] = useLocalStorage<number[]>('emotion11', []);
  const data = range(divData.length).map((_, index) => ({
    name: timeList[index],
    div: divData[index],
    emotion10: emotion10Data[index],
    emotion11: emotion11Data[index],
  }));
  console.log(data);
  return data.length > 0 ? (
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        isAnimationActive={false}
        type='monotone'
        dataKey='div'
        stroke='#8884d8'
      />
      <Line
        isAnimationActive={false}
        type='monotone'
        dataKey='emotion10'
        stroke='#82ca9d'
      />
      <Line
        isAnimationActive={false}
        type='monotone'
        dataKey='emotion11'
        stroke='#413ea0'
      />
    </LineChart>
  ) : null;
}
