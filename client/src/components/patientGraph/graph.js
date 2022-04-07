import React from 'react';
import {
  ScatterChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Scatter, ResponsiveContainer,
} from 'recharts';

const data02 = [
  {
    symptoms: 'Fever',
    MonDate: 0,
    TuesDate: 1,
    WedDate: 2,
    FriDate: 4,
  },
  {
    symptoms: 'Loss Of Smell And Taste',
    ThursDate: 3,
  },
  {
    symptoms: 'Difficulty Breathing',
    MonDate: 0,
    TuesDate: 1,
    WedDate: 2,
    FriDate: 4,
  },
  {
    symptoms: 'Cough',
    TuesDate: 1,
    ThursDate: 3,
  },
  {
    symptoms: 'Runny or Stuffy Nose',
    MonDate: 0,
    WedDate: 2,
    ThursDate: 3,
    FriDate: 4,
  },
  {
    symptoms: 'Outside of Canada',
    MonDate: 0,
    TuesDate: 1,
  },
  {
    symptoms: 'Close Contact',
    FriDate: 4,
  },
  {
    symptoms: 'Unusual Severe Fatigue',
    MonDate: 0,
    WedDate: 2,
  },
  {
    symptoms: 'Unusual Headache',
    WedDate: 2,
    ThursDate: 3,
  },
  {
    symptoms: 'Loss Of Appetite',
    TuesDate: 1,
    FriDate: 4,
  },
  {
    symptoms: 'Unexplained Muscle Pain',
    ThursDate: 3,
    FriDate: 4,
  },
  {
    symptoms: 'Sore Throat',
    MonDate: 0,
    WedDate: 2,
    ThursDate: 3,
  },
];

function graph() {
  return (
    <ResponsiveContainer width={1000} height={500}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 50,
        }}
        data={data02}
      >
        <CartesianGrid />
        <XAxis type="number" domain={[0, 4]} />
        <YAxis type="category" dataKey="symptoms" name="symptoms" width={150} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="MonDate" dataKey="MonDate" fill="#779ee0" />
        <Scatter name="TuesDate" dataKey="TuesDate" fill="#32a852" />
        <Scatter name="WedDate" dataKey="WedDate" fill="#d46688" />
        <Scatter name="ThursDate" dataKey="ThursDate" fill="#e0a51b" />
        <Scatter name="FriDate" dataKey="FriDate" fill="#a372e8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default graph;
