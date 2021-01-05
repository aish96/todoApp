import './App.css';
import Bucket from './components/Bucket';
import { Navbar, CardColumns } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { persistTodos } from "./redux/actions/TodoAction";
import { Component } from 'react';

class App extends Component {
  componentDidMount() {
    this.props.persistTodos();
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
          <Bucket />
          <Bucket addNew />
        </CardColumns>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  persistTodos: () => dispatch(persistTodos())
});
export default connect(null, mapDispatchToProps)(App);
