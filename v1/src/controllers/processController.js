const {
    getProcessesRepo,
} = require('../database/repositories/processRepository');
require('dotenv').config();



const getProcesses = (req, res) => {
    const processes = getProcessesRepo();
    res.json(
        {
            processes:processes,
            columns:[
            { header: 'ID', accessor: 'id' },
            { header: 'Name', accessor: 'pname' },
            { header: 'Status', accessor: 'statusId' },
            { header: 'Category', accessor: 'categoryId' },
            { header: 'Priority', accessor: 'priorityId' },
            { header: 'Department', accessor: 'departmentId' },
            { header: 'Owner', accessor: 'userId' },
            { header: 'Company', accessor: 'companyId' },
            { header: 'Cost', accessor: 'initialcost' },
            { header: 'Budget', accessor: 'initialbudget' },
            { header: 'Start date', accessor: 'start_at' },
            { header: 'Due date', accessor: 'end_at' },
            { header: 'Update date', accessor: 'updated_at' },
            { header: 'Creation date', accessor: 'created_at' },
            { header: 'Actions', accessor: 'actions' },
        ]
});

};


module.exports = { getProcesses};