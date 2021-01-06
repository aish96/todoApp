import './App.css';
import Bucket from './components/Bucket';
import { Navbar, CardColumns } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { persistTodos, getStoreTodo } from "./redux/actions/TodoAction";
import { Component } from 'react';
import { persistBuckets, getStore } from './redux/actions/BucketsActions';
import ReactOverlayLoader from "reactjs-overlay-loader";

class App extends Component {
  componentDidMount() {
    this.props.persistTodos();
    this.props.persistBucket();
  };
  render() {
    return (
      <ReactOverlayLoader loaderContent={<FontAwesomeIcon icon={faCircleNotch} size="6x" spin />}
        isActive={this.props.isLoading}>
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
      </ReactOverlayLoader>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    buckets: state.buckets.buckets,
    isLoading: state.buckets.loading || state.todos.loading
  }
}
const mapDispatchToProps = dispatch => ({
  persistTodos: () => dispatch(getStore()),
  persistBucket: () => dispatch(getStoreTodo()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
