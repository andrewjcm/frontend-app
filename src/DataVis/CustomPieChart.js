import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export default class CustomPieChart extends PureComponent {

  render() {
    const data = []

    for (var key in this.props.data) {
      if (this.props.data.hasOwnProperty(key)) {
        data.push({name: key, value: this.props.data[key]})
      }
    }

    return (
      <ResponsiveContainer width="99%">
        <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={125}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
