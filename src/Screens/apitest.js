import React from 'react';

class apitest extends React.Component {
constructor(){
    super();
    this.logData = this.logData.bind(this);
}
    logData(){
        fetch('http://localhost:5000/api/getUserById?id=1', {mode: 'cors'})
            .then((result) =>{ return result.json() })
            .then((result) => console.log(result));
    }

  render() {
    return (
      <div className="apitest">
        <button onClick={this.logData}>log data</button>
      </div>
    );
  }
}

export default apitest;
