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
import { addInputBar_Bucket } from "../redux/actions/BucketsActions";

class Bucket extends Component {

    addItemInput() {

    }

    render() {
        let totalItems = this.props.listItems.length;
        let borderStyle = {};
        if (this.props.bucket) {
            borderStyle = {
                borderTop: `7px solid #${this.props.bucket.color}`
            };
        }
        return (
            <Card>
                <Card.Body style={borderStyle}>
                    {this.props.addNew &&
                        <Card.Body className="text-center">
                            {this.props.isAddBucketClicked ?
                                <AddTask type={TYPES.ADD_BUCKET} />
                                : <Button variant="link" onClick={this.props.onAddBucketClick}>
                                    <FontAwesomeIcon icon={faPlus} className="icons" /> Add new bucket
                        </Button>}
                        </Card.Body>
                    }
                    {!this.props.addNew &&
                        <Fragment>
                            <Card.Title>{this.props.bucket.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{totalItems} Card{totalItems > 1 ? "s" : ""}</Card.Subtitle>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    {this.props.isAddTaskClicked ?
                                        <AddTask type={TYPES.ADD_TODO} /> :
                                        <Button variant="link" onClick={() => { this.props.onAddTask(this.props.bucket.id) }}>
                                            <FontAwesomeIcon icon={faPlus} className="icons" /> Add new tasks
                                        </Button>
                                    }
                                </ListGroupItem>
                                {this.props.listItems && this.props.listItems.map(item => {
                                    if (item.bucketId === this.props.bucket.id)
                                        return (< ListGroupItem key={item.id} >
                                            <Todo item={item} bucket={this.props.bucket} />
                                        </ListGroupItem>)
                                    return null;
                                })}
                            </ListGroup>
                        </Fragment>
                    }
                </Card.Body>
            </Card >)
    }
}
const mapDispatchToProps = dispatch => ({
    addTodo: todo => dispatch(addTodo(todo)),
    onAddTask: (e) => dispatch(addInputBar(e)),
    onAddBucketClick: () => dispatch(addInputBar_Bucket())

});
const mapStateToProps = ({ todos, buckets }, passedProps) => ({
    isAddTaskClicked: todos.isAddTaskClicked,
    listItems: todos.todos,
    ...passedProps,
    isAddBucketClicked: buckets.isAddBucketClicked
});
export default connect(mapStateToProps, mapDispatchToProps)(Bucket);