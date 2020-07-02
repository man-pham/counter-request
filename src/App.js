import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import axios from'axios';
import { getDataState } from "./redux/selectors";

import Example from './components/Modal'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }
  componentWillMount() {
    this.setupInterceptors();

  }
  setupInterceptors = () => {
    axios.interceptors.response.use(
      response => response,
      (error) => {
       if(error && error.response) {
         this.props.toggleModal(true)
       }
        return Promise.reject(error);
      }
    );
    }
  updateInput = input => {
    this.setState({ input });
  };
  handleMakeReq =  () => {
      let urls = [];
      for (let i = 1; i <= this.state.input;++i) 
        urls.push(`https://reqres.in/api/users/${i}`);
      this.props.makeReq(urls)

    this.setState({ input: "" });
  };
  handleMakeReqFail =  (urls) => {
     this.props.makeReq(urls)
     this.props.toggleModal(false);
};
  
  render() {
    //let countSuccess = this.props.store.data.length;
    console.log(this.props.store);
    return (
      <div className="container mt-3">
        <div className="text-center">
          <div>
            <input
              type="number"
              onChange={e => this.updateInput(e.target.value)}
              value={this.state.input}
              placeholder=""
            />
          </div>
          <div className="mt-4">
            <button
              onClick={this.handleMakeReq}
              className="btn btn-primary btn-snc btn-md"
            >
              Sync
            </button>
          </div>
        </div>
        {this.props.store.data && this.props.store.data.length
          ? this.props.store.data.map(user => {
              return (
                <div className="row mt-5" key={user.id}>
                  <div className="col-sm-12 d-flex align-items-stretch">
                    <div className="avatar">
                      <img src={user.avatar} alt="avatar" />
                    </div>
                    <div className="info">
                      <p>Firstname:{user.first_name}</p>
                      <p>Lastname:{user.last_name}</p>
                      <p>Email:{user.email}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
          <div className="status-req">  
            <h4>{`${this.props.store.countSuccess}/${this.props.store.total} Success`}</h4>
            <h4>{`${this.props.store.countFail}/${this.props.store.total} Fail`}</h4>
          </div>
          <Example show={this.props.store.showModal}
                  handleClose={()=>this.props.toggleModal(false)} 
                  handleRetry={()=>this.handleMakeReqFail(this.props.store.failReq)}
                  />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const store = getDataState(state);
  
  return { store };
};
const mapDispatchToProps = dispatch => {
  return {
    makeReq: data => dispatch({ type: "CALL_REQ", data }),
    toggleModal: data => dispatch({ type: "TOGGLE_MODAL", data })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
