import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default class CustomBarChart extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="99%" height="99%">
        <BarChart
          width={100}
          height={200}
          data={this.props.data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid  />
          <XAxis dataKey="name" />
          <YAxis/>
          <Tooltip />
          <Legend />
          <Bar dataKey="survived" stackId="a" fill="#8884d8" />
          <Bar dataKey="died" stackId="b" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
