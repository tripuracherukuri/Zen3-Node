import React, { Component } from 'react';
import './App.css';
const url = 'http://localhost:3005'

class App extends Component {
  constructor(){
    super();
    this.state={
      process: '-1',
      key: '',
      value: '',
      data: null
    }
  }

  getEnviroments = (process) => {
    if (process === '-1') {
      return false;
    }
    fetch(` ${url}/getEnvVariable/${process}`)
      .then((data) => data.json())
      .then((result) => this.setState({ data: result }));
  };

  addEnviroments = (process, key, value) => {
    if (process === '-1') {
      return false;
    }
    fetch(`${url}/addEnvVariable/${process}/${key}/${value}`)
      .then((data) => data.json())
      .then((result) => this.setState({ data: result }));
  };


  render() {
    let { data, process, key, value } = this.state;
    return (
      <div>
        <h3 className="text-center py-2">Environment Management System</h3>
        <div style={{ padding: '10px' , textAlign: 'center'}}>
        <h5 className="text-center py-2">Get Environment Variables Here</h5>
          <select className="mr-4" value={process} onChange={(event) => this.setState({ process: event.target.value })}>
            <option value="-1">Select process</option>
            <option value="Process1">P1</option>
            <option value="Process2">P2</option>
          </select>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => this.getEnviroments(process)}>Submit</button>
        </div>
        <div className="d-flex justify-content-center">
        <ul style={{ padding: '0px auto' }}>
          {data && Object.keys(data).map((dat) => (
                <li style={{ padding: '10px' }} key={dat}>
                  <span style={{ color: 'gray' }}> Key: </span> {dat} <br />
                  <span style={{ color: 'gray' }}> Value: </span>
                  {(data)[dat]}
                </li>
              ))}
        </ul>
        </div>
        <h5 className="text-center py-2">Add Environment Variables Here</h5>
        <div style={{ padding: '10px' , textAlign: 'center'}}>
          <div>
          <label className="mr-2">Select Process </label>
          <select style={{ width: '200px',marginRight:20 }} value={process} onChange={(event) => this.setState({ process: event.target.value })}>
            <option value="-1">Select process</option>
            <option value="Process1">P1</option>
            <option value="Process2">P2</option>
          </select>
          </div>
          <div>
          <label className="mr-4">Env Name </label>
          <input
            type="text"
            value={key}
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ key: e.target.value })}
          />
          </div>
          <div>
          <label className="mr-4">Env Value </label>
          <input
            type="text"
            value={value}
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ value: e.target.value })}
          />
          </div>
          <button
            type="button" class="btn btn-primary btn-sm"
            onClick={() =>
              this.addEnviroments(process, key, value)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

export default App;