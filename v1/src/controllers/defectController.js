const {
    getDefectRepo,
} = require('../database/repositories/defectRepository');
require('dotenv').config();



const getDefects = (req, res) => {
    const defects = getDefectRepo();
    res.json(
        {
            defects:defects,
            columns:[
            { header: 'ID', accessor: 'id' },
            { header: 'Name', accessor: 'pname' },
            { header: 'Description', accessor: 'ddesc' },
            { header: 'Status', accessor: 'statusId' },
            { header: 'Category', accessor: 'categoryId' },
            { header: 'Priority', accessor: 'priorityId' },
            { header: 'Department', accessor: 'departmentId' },
            { header: 'Owner', accessor: 'userId' },
            { header: 'Cost', accessor: 'initialcost' },
            { header: 'Budget', accessor: 'initialbudget' },
            { header: 'Final cost', accessor: 'finalcost' },
            { header: 'Start date', accessor: 'start_at' },
            { header: 'Due date', accessor: 'end_at' },
            { header: 'Update date', accessor: 'updated_at' },
            { header: 'Creation date', accessor: 'created_at' },
            { header: 'Actions', accessor: 'actions' },
        ]
});

};


module.exports = { getDefects};