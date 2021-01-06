const _ = require("lodash");
const dbconnection = require("../utils/createDBConnection");

const TableNameTodo = "my-todos";
const TableNameBucket = "my-todo-buckets";


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
async function getDynamoItems(params) {
    try {
        console.log("Fetching ", params.TableName, "...");
        let scanResults = [];
        let items;
        do {
            items = await dbconnection.scan(params).promise();
            items.Items.forEach((item) => scanResults.push(item));
            params.ExclusiveStartKey = items.LastEvaluatedKey;
        } while (typeof items.LastEvaluatedKey != "undefined");
        return scanResults;
    } catch (e) {
        console.log({ error: true, info: e });
        return { error: true, info: e };
    }
}

exports.handler = async () => {
    try {
        let buckets = await getDynamoItems({ TableName: TableNameBucket });
        let todos = await getDynamoItems({ TableName: TableNameTodo });
        let store = {};
        store.buckets = buckets.map(bucket => {
            bucket.id = bucket.bucketId;
            delete bucket.bucketId;
            return bucket;
        });
        store.todos = todos.map(todo => {
            todo.id = todo.todoId;
            delete todo.todoId;
            return todo;
        });
        return store;
    } catch (e) {
        return { error: true, info: JSON.stringify(e) };
    }
};
