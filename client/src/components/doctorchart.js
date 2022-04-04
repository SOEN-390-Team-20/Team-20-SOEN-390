import * as React from 'react';
import {
  Bar, Legend, BarChart, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Patient 1',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Patient 2',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Patient 3',
    uv: 2000,
    pv: 9800,
  },
  {
    name: 'Patient 4',
    uv: 2780,
    pv: 3908,
  },
  {
    name: 'Patient 5',
    uv: 1890,
    pv: 4800,
  },
  {
    name: 'Patient 6',
    uv: 2390,
    pv: 3800,
  },
  {
    name: 'Patient 7',
    uv: 3490,
    pv: 4300,
  },
  {
    name: 'Patient 8',
    uv: 3490,
    pv: 4300,
  },
  {
    name: 'Patient 9',
    uv: 3490,
    pv: 4300,
  },
  {
    name: 'Patient 10',
    uv: 3490,
    pv: 4300,
  },
];

function Doctorchart() {
  return (
    <BarChart
      height={450}
      data={data}
      width={1200}
      style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', width: '..', height: '..',
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#151ea6" />
      <Bar dataKey="uv" fill="#cc9901" />
    </BarChart>
  );
}
export default Doctorchart;
