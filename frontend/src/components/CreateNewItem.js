import { Component } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { createTodoAPI, changeInputText, hideInputBar, updateTodoItem, hideEditBar, updateTodoApi } from "../redux/actions/TodoAction";
import { TYPES } from "../utils";
import { changeInputText_Bucket, hideInputBar_Bucket, createBucketAPI } from "../redux/actions/BucketsActions";

class AddTask extends Component {
    onChangeHandler = (e) => {
        switch (this.props.type) {
            case TYPES.EDIT_TODO:
                this.props.onEditTask(e);
                break;
            case TYPES.ADD_TODO:
                this.props.onTaskType(e);
                break;
            case TYPES.ADD_BUCKET:
                this.props.onBucType_Bucket(e);
                break;
            default:
                break;
        }
    }
    onEditHandler = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        switch (this.props.type) {
            case TYPES.EDIT_TODO:
                this.props.finishEdit(this.getText(), this.props.task.id, this.props.task.completed);
                break;
            case TYPES.ADD_TODO:
                this.props.createTodo(this.props.bucket.id, this.getText());
                break;
            case TYPES.ADD_BUCKET:
                this.props.createBuckets(this.getText());
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
            case TYPES.ADD_BUCKET:
                return this.props.bucketText;
            default:
                break;
        }
    }
    onClose = (e) => {
        e.stopPropagation();
        switch (this.props.type) {
            case TYPES.EDIT_TODO:
                this.props.hideEdit();
                break;
            case TYPES.ADD_TODO:
                this.props.hideInput();
                break;
            case TYPES.ADD_BUCKET:
                this.props.hideInput_Bucket();
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
                            placeholder="Enter Title" onChange={this.onChangeHandler}
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
    onBucType_Bucket: e => dispatch(changeInputText_Bucket(e.target.value)),
    hideInput_Bucket: () => dispatch(hideInputBar_Bucket()),
    hideEdit: () => dispatch(hideEditBar()),
    finishEdit: (task, id, completed) => dispatch(updateTodoApi({ task, id, completed })),
    createTodo: (bId, taskId) => dispatch(createTodoAPI({ bucketId: bId, task: taskId })),
    createBuckets: (e) => dispatch(createBucketAPI({ name: e }))
});
const mapStateToProps = (state, passedProps) => ({
    taskText: state.todos.taskText,
    bucketAddText: state.buckets.tempText,
    editText: state.todos.editItem.text,
    bucketText: state.buckets.tempText,
    ...passedProps
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTask);