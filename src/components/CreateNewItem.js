import { Component } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { addTodo, changeInputText, hideInputBar, updateTodoItem, finishUpdateItem, hideEditBar } from "../redux/actions/TodoAction";
import { TYPES } from "../utils";

class AddTask extends Component {
    onChangeHandler = (e) => {
        switch (this.props.type) {
            case TYPES.EDIT_TODO:
                this.props.onEditTask(e);
                break;
            case TYPES.ADD_TODO:
                this.props.onTaskType(e);
                break;
            default:
                break;
        }
    }
    onEditHandler = () => {
        switch (this.props.type) {
            case TYPES.EDIT_TODO:
                this.props.finishEdit();
                break;
            case TYPES.ADD_TODO:
                this.props.createTodo();
                break;
            default:
                break;
        }
    }
    getText = () => {
        switch (this.props.type) {
            case TYPES.EDIT_TODO:
                return this.props.editText;
            case TYPES.ADD_TODO:
                return this.props.taskText;
            default:
                break;
        }
    }
    onClose = () => {
        switch (this.props.type) {
            case TYPES.EDIT_TODO:
                this.props.hideEdit();
                break;
            case TYPES.ADD_TODO:
                this.props.hideInput();
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <div>
                <div>
                    <InputGroup className="mb-3">
                        <FormControl
                            name="taskText" value={this.getText()}
                            placeholder="Enter Task" onChange={this.onChangeHandler}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-success" onClick={this.onEditHandler}>
                                <FontAwesomeIcon icon={faCheck} />
                            </Button>
                            <Button variant="outline-danger" onClick={this.onClose}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>

                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    onTaskType: e => dispatch(changeInputText(e.target.value)),
    onEditTask: e => dispatch(updateTodoItem(e.target.value)),
    hideInput: () => dispatch(hideInputBar()),
    hideEdit: () => dispatch(hideEditBar()),
    finishEdit: () => dispatch(finishUpdateItem()),
    createTodo: () => dispatch(addTodo())
});
const mapStateToProps = (state, passedProps) => ({
    taskText: state.taskText,
    editText: state.editItem.text,
    type: passedProps.type
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTask);