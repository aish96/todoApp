const _ = require("lodash");
const dbconnection = require("../utils/createDBConnection");

const TableName = "my-todos";

//  update my-todos set task={task} where todoId={todoId} ------- SQL version for updating task
//  update my-todos set completed={true/false} where todoId={todoId} ------- SQL version for updating task state

const updateUserState = async (
  todoId, task, completed
) => {
  try {
    let updateValue = {}, exp = "";
    if (task !== undefined) {
      updateValue = _.merge(updateValue, { ":task": task });
      exp = "set task= :task";
    }
    if (completed !== undefined) {
      updateValue = _.merge(updateValue, { ":completed": completed });
      exp = "set completed= :completed";
    }
    if (task !== undefined && completed !== undefined) {
      exp = "set completed= :completed,task= :task";
    }
    var params = {
      TableName,
      Key: {
        todoId,
      },
      ExpressionAttributeValues: updateValue,
      UpdateExpression: exp,
    };
    console.log(params);
    const result = await dbconnection.update(params).promise();
    return result;
  } catch (e) {
    console.log({ error: true, message: e });
    return { error: true, message: JSON.stringify(e, null, 2) };
  }
};


exports.handler = async (event) => {
  console.log("Event", JSON.stringify(event));
  try {
    await updateUserState(
      event.todoId, event.task, event.completed
    );
    return { info: "Updated Successfully" };
  } catch (e) {
    return { error: true, info: JSON.stringify(e) };
  }
};
