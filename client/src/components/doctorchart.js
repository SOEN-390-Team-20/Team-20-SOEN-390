import * as React from 'react';
import {
  Bar, Legend, BarChart, XAxis, CartesianGrid,
} from 'recharts';

const data = [
  {
    name: 'noory',

    dosages: 10000,
  },
  {
    name: 'uoiuoiu',

    dosages: 0,
  },
  {
    name: 'patient 3',

    dosages: 5000,
  },
  {
    name: 'patient',

    dosages: 10000,
  },
  {
    name: 'ramzi',

    dosages: 5000,
  },
  {
    name: 'patient',

    dosages: 5000,
  },
  {
    name: 'qqq',

    dosages: 10000,
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
      <Legend />
      <Bar dataKey="dosages" fill="#151ea6" />
    </BarChart>
  );
}
export default Doctorchart;
