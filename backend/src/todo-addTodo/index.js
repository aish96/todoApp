const _ = require("lodash");
const dbconnection = require("../utils/createDBConnection");

const TableName = "my-todos";

const addToTable = async (id, bucketId, task, completed) => {
  try {
    var params = {
      TableName,
      Item: {
        todoId: id, bucketId, task, completed,
      },
      ConditionExpression: "todoId <> :f",
      ExpressionAttributeValues: {
        ":f": id,
      },
    };
    const result = await dbconnection.put(params).promise();
    return result.Items;
  } catch (e) {
    console.log({ error: true, message: e });
    if (e.code === "ConditionalCheckFailedException") {
      throw "TodoId already exists";
    }
    throw JSON.stringify(e, undefined, 2);
  }
};
exports.handler = async (event) => {
  try {
    console.log("Event", JSON.stringify(event));
    let { id, bucketId, task, completed } = event;
    let a = await addToTable(id, bucketId, task, completed);
    console.log(a);
    return { info: "Task created Successfully", success: true };
  } catch (e) {
    throw { error: true, info: e };
  }
};
