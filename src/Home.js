import React from 'react';
import axios from 'axios';
import CustomAreaChart from './DataVis/CustomAreaChart';
import CustomPieChart from './DataVis/CustomPieChart';


class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      data: null
    }
  }

  componentDidMount(){
    axios.get('http://localhost:8000/api/covid-data', {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      this.setState({
        loading: false,
        data: response.data
      });
      }).catch(error => {
        this.setState({ loading: false });
        console.log(error)
      });
  }

  render(){
      if (this.state.data) {
        return(
        <div className="grid-container">
          <div className="grid-item grid-title">
            <h1 className="center"> COVID-19 Survival Guide*</h1>
          </div>
          <div className="grid-item item-survive">
            <h3 className="center">Survival Rate</h3>
            <p className="center xl-font">{this.state.data.survival_rate[0].rate.toFixed(2)}%</p>
          </div>
          <div className="grid-item item-title-vis1">
            <h3 className="center">Deaths by Age</h3>
          </div>
          <div className="grid-item item-data-vis1">
            <CustomAreaChart data={this.state.data.death_age} xLabel="age" yLabel="count"/>
          </div>
          <div className="grid-item item-title-vis2">
            <h3 className="center">Comorbidities</h3>
          </div>
          <div className="grid-item item-data-vis2">
            <CustomPieChart data={this.state.data.comorbidity[0]}/>
          </div>
        </div>
        );
      }
    return(
      <div>
        Loading..
      </div>
    );
  }
}
export default Home;
