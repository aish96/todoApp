const dbConnection = require("../utils/createDBConnection");

const TableName = "my-todos";
const limit = 25;

async function deleteUsers(ids) {
    let idGroups = []

    for (var i = 0; i < ids.length; i += limit) {
        idGroups.push(ids.slice(i, i + limit))
    }

    for (var gs of idGroups) {
        let delReqs = gs.map(({ todoId }) => {
            return {
                DeleteRequest: { Key: { todoId } }
            };
        });
        let params = {
            RequestItems: {
                [TableName]: delReqs
            }
        };
        const result = await dbConnection.batchWrite(params).promise();
        console.log(gs.map(stud => stud.email), gs.length + ' items deleted')
        return result;
    }
    return {}
}

exports.handler = async function (event) {
    try {
        console.log("event", JSON.stringify(event, null, 2));
        let result = await deleteUsers(event);
        return result;
    } catch (e) {
        throw { error: true, info: e }
    }
};
