import './App.css';
import Bucket from './components/Bucket';
import { Navbar, CardColumns } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { persistTodos } from "./redux/actions/TodoAction";
import { Component } from 'react';
import { persistBuckets } from './redux/actions/BucketsActions';

class App extends Component {
  componentDidMount() {
    this.props.persistTodos();
    this.props.persistBucket();
  };
  render() {
    return (
      <div className="App" >
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <FontAwesomeIcon icon={faClipboardList} className="icons" />
            TODOIST
    </Navbar.Brand>
        </Navbar>
        <CardColumns className="container">
          {this.props.buckets && this.props.buckets.map(bucket => (
            <Bucket key={bucket.id} bucket={bucket} />
          ))}
          <Bucket addNew />
        </CardColumns>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    buckets: state.buckets.buckets
  }
}
const mapDispatchToProps = dispatch => ({
  persistTodos: () => dispatch(persistTodos()),
  persistBucket: () => dispatch(persistBuckets()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
