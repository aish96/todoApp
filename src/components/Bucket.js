import { Fragment, Component } from "react";
import * as _ from "lodash";
import { connect } from "react-redux";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addTodo, addInputBar } from "../redux/actions/TodoAction";
import AddTask from "./CreateNewItem";
import Todo from "./Todo";
import { TYPES } from "../utils";


const colors = ["e69373", "805240", "e6d5cf", "bf5830",
    "77d36a", "488040", "d2e6cf", "43bf30",
    "557aaa", "405c80", "cfd9e6", "306ebf",
    "ff9900", "b36b00", "ffcc80",
    "00b366", "007d48", "bfffe4", "80ffc9",
    "400099", "2d006b", "dabfff", "b580ff"];

class Bucket extends Component {

    addItemInput() {

    }

    render() {
        let totalItems = this.props.listItems.length;
        let colorIdx = _.random(colors.length - 1);
        let borderStyle = {
            borderTop: `7px solid #${colors[colorIdx]}`
        };
        return (
            <Card>
                <Card.Body style={borderStyle}>
                    {this.props.addNew &&
                        <Card.Body className="text-center">
                            <Button variant="link">
                                <FontAwesomeIcon icon={faPlus} className="icons" /> Add new bucket
                        </Button>
                        </Card.Body>
                    }
                    {!this.props.addNew &&
                        <Fragment>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{totalItems} Card{totalItems > 1 ? "s" : ""}</Card.Subtitle>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    {this.props.isAddTaskClicked ?
                                        <AddTask type={TYPES.ADD_TODO} /> :
                                        <Button variant="link" onClick={this.props.onAddTask}>
                                            <FontAwesomeIcon icon={faPlus} className="icons" /> Add new tasks
                                        </Button>
                                    }
                                </ListGroupItem>
                                {this.props.listItems && this.props.listItems.map(item => (
                                    <ListGroupItem key={item.id}><Todo item={item} /></ListGroupItem>
                                ))}
                            </ListGroup>
                        </Fragment>
                    }
                </Card.Body>
            </Card >)
    }
}
const mapDispatchToProps = dispatch => ({
    addTodo: todo => dispatch(addTodo(todo)),
    onAddTask: () => dispatch(addInputBar())
});
const mapStateToProps = ({ todos, isAddTaskClicked }, passedProps) => ({
    isAddTaskClicked,
    listItems: todos,
    ...passedProps
});
export default connect(mapStateToProps, mapDispatchToProps)(Bucket);