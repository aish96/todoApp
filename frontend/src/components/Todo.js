import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { editTodo, deleteTodo } from "../redux/actions/TodoAction";
import CreateNewItem from "./CreateNewItem";
import { TYPES } from "../utils";

class Todo extends Component {
    render() {
        let { text, id, completed } = this.props.item;
        return (
            <Fragment>
                {this.props.selected === id ?
                    <CreateNewItem type={TYPES.EDIT_TODO} bucket={this.props.bucket} /> :
                    <Fragment >
                        <FontAwesomeIcon icon={completed ? faCheckSquare : faSquare} className="icons" />
                        <label className="py-1">{text}</label>
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
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    editTodo: ({ id, text }) => dispatch(editTodo({ id, text })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);