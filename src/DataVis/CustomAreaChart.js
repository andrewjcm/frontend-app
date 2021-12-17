import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default class CustomAreaChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="99%" height="99%">
        <AreaChart
          width={400}
          height={300}
          data={this.props.data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={this.props.xLabel} />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey={this.props.yLabel} stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
