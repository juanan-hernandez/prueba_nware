let url = "https://0do7kgkega.execute-api.eu-west-1.amazonaws.com/Dev/testData"
const superagent = require('superagent');

const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({profile: 'test-nware'});
AWS.config.credentials = credentials;
AWS.config.update({
    region: "eu-west-1"
});
const docClient = new AWS.DynamoDB.DocumentClient();
let responseOk = false;
let apiPKs = [];
let dbData = {};
const paramsDb = {
    TableName: "TechnicalTest"
};

async function getApiData(){

    while (!responseOk) {
        await superagent.get(url).then(res => {
            apiPKs = res.body
            responseOk = true;
        }).catch(err => {
            console.log('Could not get API response: error %i. Retrying again', err.status)
        });

    }
    console.log('Data extracted from the API: %s', apiPKs.toString());
}

async function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DynamoDB table scan succeeded.");
        dbData = data;
    }
}

function getGroupBySumFromDbItems(pks, data) {
    let filteredData = data.filter(function (item) {
        return pks.includes(item.pK);
    }).map(function (e) {
        e.date = new Date(e.date).toISOString().slice(0, 10);
        return e;
    });
    let groupedValuesByDate = [];
    filteredData.reduce(function (res, value) {
        if (!res[value.date]) {
            res[value.date] = {date: value.date, value: 0};
            groupedValuesByDate.push(res[value.date])
        }
        res[value.date].value += value.value;
        return res;
    }, {});

    return groupedValuesByDate;
}

exports.handler = async function (event, context) {

    await getApiData();
    await docClient.scan(paramsDb, onScan).promise();
    const result = getGroupBySumFromDbItems(apiPKs.map(String), dbData.Items);
    console.log(result);
    return result;

};
