import React from 'react';
import axios from 'axios';
import CustomAreaChart from '../DataVis/CustomAreaChart';
import CustomPieChart from '../DataVis/CustomPieChart';
import CustomBarChart from '../DataVis/CustomBarChart';


class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      data: null,
      survival_rate_bars: null
    }
  }

  componentDidMount(){
    if (!this.state.data) {
      axios.get('/api/covid-data/', {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {

        ;
        this.setState({
          loading: false,
          data: response.data,
          survival_rate_bars: [{
              name: 'Survival Rate %',
              survived: response.data.survival_rate[0].rate.toFixed(2),
              died: (100 - response.data.survival_rate[0].rate).toFixed(2),
          }]
        });
        }).catch(error => {
          this.setState({ loading: false });
          console.log(error)
        });
      }
  }

  render(){
      if (this.state.data) {
        console.log(this.state.survival_rate_bars)
        return(
        <div className="grid-container">
          <div className="grid-item grid-title">
            <h1 className="center"> COVID-19 Survival Guide*</h1>
          </div>
          <div className="grid-item item-title-vis1">
            <h3 className="center">Survival Rate</h3>
          </div>
          <div className="grid-item item-data-vis1">
            <CustomBarChart data={this.state.survival_rate_bars}/>
          </div>
          <div className="grid-item item-title-vis2">
            <h3 className="center">Deaths by Age</h3>
          </div>
          <div className="grid-item item-data-vis2">
            <CustomAreaChart data={this.state.data.death_age} xLabel="age" yLabel="count"/>
          </div>
          <div className="grid-item item-title-vis3">
            <h3 className="center">Comorbidities</h3>
          </div>
          <div className="grid-item item-data-vis3">
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
