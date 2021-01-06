const _ = require("lodash");
const dbconnection = require("../utils/createDBConnection");

const TableName = "my-todo-buckets";

const addToTable = async (id, name, color) => {
  try {
    var params = {
      TableName,
      Item: {
        bucketId: id, name, color,
      },
      ConditionExpression: "bucketId <> :f",
      ExpressionAttributeValues: {
        ":f": id,
      },
    };
    const result = await dbconnection.put(params).promise();
    return result.Items;
  } catch (e) {
    console.log({ error: true, message: e });
    if (e.code === "ConditionalCheckFailedException") {
      throw "Link with PrismicId already exists";
    }
    throw JSON.stringify(e, undefined, 2);
  }
};
exports.handler = async (event) => {
  try {
    console.log("Event", JSON.stringify(event));
    let { id, name, color } = event;
    let a = await addToTable(id, name, color);
    console.log(a);
    return { info: "Bucket created Successfully", success: true };
  } catch (e) {
    throw { error: true, info: e };
  }
};
