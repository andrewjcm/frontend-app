import React from 'react';
import { getUser, setUserSession, removeUserSession, getFormResponse, removeFormResponse } from './Utils/Common';
import HealthProfileForm from './Forms/HealthProfileForm';
import maleImage from './static/images/Male.jpg'
import femaleImage from './static/images/Female.jpg'


class Dashboard extends React.Component{
  constructor(props) {
    super(props)
    this.unAuthReceived = this.unAuthReceived.bind(this);
    this.onResetForm = this.onResetForm.bind(this);
    this.onFormSent = this.onFormSent.bind(this);
    this.state = {formSent: false}
  }

  unAuthReceived(e) {
    this.props.handleAuthChange(e);
  }

  onResetForm(formSent) {
    this.setState({formSent: false});
    removeFormResponse();
  }

  onFormSent(formSent) {
    this.setState({formSent});
  }

  componentDidMount() {
    const formResponse = getFormResponse();
    if (!this.state.formSent && formResponse){
      this.setState({formSent: true})
    }
  }

  componentDidUpdate() {
    const formResponse = getFormResponse();
    if (!this.state.formSent && formResponse){
      this.setState({formSent: true})
    }
  }

  render() {
    const userStr = getUser();
    const userChar = userStr.charAt(0);
    const user = userChar.toUpperCase() + userStr.slice(1);

    const formResponse = getFormResponse();
    const died = "Sorry, you will die.";
    const survive = "Congrats, you will not die!";


    if (formResponse) {
      const age = formResponse.age;
      const sex = formResponse.sex === 1 ? "Female" : "Male";
      const sexImage = formResponse.sex == 1 ? femaleImage : maleImage;

      let healthRisks = new Array();
      if (formResponse["age"] > 65 ) { healthRisks.push("Old age"); }
      for (var key in formResponse) {
        if (
          formResponse.hasOwnProperty(key)
          && String(key) != String("sex")
          && String(key) != String("died")
        ) {
          if (formResponse[key] == 1) {
            healthRisks.push(String(key));
          }
        }
      }

      return (
        <div className="grid-container">
          <div className="grid-item item-title">
            <h3 >{ formResponse.died == 1 ? died : survive }</h3>
          </div>

          <div className="grid-item item-content">
            <fieldset>
              <legend>Your Details</legend>
              <img className="image-prof right" src={sexImage} alt={sex + " silhouette"}/>
              <p>Age: {age}</p>
              <p>Sex: {sex}</p>
              <p>Health Risks: </p>
              <ul>
                {
                  healthRisks.length == 0 ? "None" : healthRisks.map((i) => <li>{i}</li>)
                }
              </ul><br/>
              <input type="button" value="Reset" onClick={this.onResetForm}/>
            </fieldset>
          </div>
      </div>
      )
    }
    return(
      <div className="grid-container">
        <div className="grid-item item-title">
          <h3>Will you survive COVID-19?</h3>
          <small><i>Fill out this form to find out!</i></small>
        </div>
        <div className="grid-item item-content">
          <HealthProfileForm onResponseReceived={this.onFormSent} onUnauthReceived={this.unAuthReceived}/>
        </div>
      </div>
    )
  }
}

export default Dashboard;
