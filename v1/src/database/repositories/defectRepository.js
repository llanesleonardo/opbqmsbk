//let { projects } = require('../models/predefinedArrayProjectModel');

const defects =[
    {
        "id":"1",
        "pname": "DEFECT 1",
        "ddesc": "DESC 1",
        "statusId": "To do",
        "categoryId": "Inventory",
        "priorityId": "High",
        "departmentId": "Accounting",
        "userId": "userOwnerDefect",
        "initialcost": "$23.00",
        "initialbudget": "$34.00",
        "finalcost": "$23.00",
        "start_at": "2024-06-04T21:30",
        "end_at": "2024-06-20T21:30",
        "updated_at": "2024-06-24T04:30",
        "created_at": "2024-06-24T04:30"
    }
];


const getDefectRepo = () => {
    return defects;
};


module.exports = {
    getDefectRepo,
};