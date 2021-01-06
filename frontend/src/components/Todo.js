import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { editTodo, deleteTodoApi } from "../redux/actions/TodoAction";
import CreateNewItem from "./CreateNewItem";
import { TYPES } from "../utils";

class Todo extends Component {
    render() {
        let { task, id, completed } = this.props.item;
        return (
            <Fragment>
                {this.props.selected === id ?
                    <CreateNewItem type={TYPES.EDIT_TODO} bucket={this.props.bucket} task={this.props.item} /> :
                    <Fragment >
                        <FontAwesomeIcon icon={completed ? faCheckSquare : faSquare} className="icons" />
                        <label className="py-1">{task}</label>
                        <ButtonGroup className="float-right">
                            <Button variant="link" className="text-info rounded-lg"
                                onClick={() => { this.props.editTodo(this.props.item) }}>
                                <FontAwesomeIcon icon={faPen} />
                            </Button>
                            <Button variant="link" className="text-danger rounded-lg"
                                onClick={() => { this.props.deleteTodo(id) }} >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </ButtonGroup>
                    </Fragment>}
            </Fragment>
        )
    }
}
const mapStateToProps = (state, passedProps) => {
    return {
        selected: state.todos.selected,
        ...passedProps
    }
}

const mapDispatchToProps = dispatch => ({
    deleteTodo: (id) => dispatch(deleteTodoApi(id)),
    editTodo: ({ id, task }) => dispatch(editTodo({ id, task })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);