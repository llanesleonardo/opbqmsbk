//let { projects } = require('../models/predefinedArrayProjectModel');

const projects =[
    {
        "id":"1",
        "pname": "P1",
        "pdesc": "desc",
        "statusId": "status2",
        "categoryId": "cat2",
        "priorityId": "3",
        "departmentId": "dep2",
        "userId": "user1",
        "companyId": "company1",
        "initialcost": "$23.00",
        "initialbudget": "$34.00",
        "start_at": "2024-06-04T21:30",
        "end_at": "2024-06-20T21:30",
        "updated_at": "2024-06-24T04:30",
        "created_at": "2024-06-24T04:30"
    },{
        "id":"2",
        "pname": "P2",
        "pdesc": "desc",
        "statusId": "status2",
        "categoryId": "cat2",
        "priorityId": "3",
        "departmentId": "dep2",
        "userId": "user1",
        "companyId": "company1",
        "initialcost": "$23.00",
        "initialbudget": "$34.00",
        "start_at": "2024-06-04T21:30",
        "end_at": "2024-06-20T21:30",
        "updated_at": "2024-06-24T04:30",
        "created_at": "2024-06-24T04:30"
    },{
        "id":"3",
        "pname": "P3",
        "pdesc": "desc",
        "statusId": "status2",
        "categoryId": "cat2",
        "priorityId": "3",
        "departmentId": "dep2",
        "userId": "user1",
        "companyId": "company1",
        "initialcost": "$23.00",
        "initialbudget": "$34.00",
        "start_at": "2024-06-04T21:30",
        "end_at": "2024-06-20T21:30",
        "updated_at": "2024-06-24T04:30",
        "created_at": "2024-06-24T04:30"
    }
];
const project = {
    "id":"1",
    "pname": "P1",
    "pdesc": "desc",
    "statusId": "status2",
    "categoryId": "cat2",
    "priorityId": "3",
    "departmentId": "dep2",
    "userId": "user1",
    "companyId": "company1",
    "initialcost": "$23.00",
    "initialbudget": "$34.00",
    "start_at": "2024-06-04T21:30",
    "end_at": "2024-06-20T21:30",
    "updated_at": "2024-06-24T04:30",
    "created_at": "2024-06-24T04:30"
};
const statusId = 
[
  "",
  "status1",
  "status2",
  "status3",
  "status4"
];

const categoryId = 
[
 "",
  "cat1",
  "cat2",
  "cat3",
  "cat4"
];

const priorityId = 
[
 "",
  "1",
  "2",
  "3",
  "4"
];


const departmentId = 
[
 "",
  "dep1",
  "dep2",
  "dep3",
  "dep4"
];


const userId = 
[
  "user1",
  "user2",
  "user3",
  "user4"
];

const companyId = 
[
  "company1",
  "company2",
  "company3",
  "company4"
];

const getProjectsRepo = () => {
    return projects;
};

const getProjectRepo = ()=>{
    return projects;
};


const getStatusRepo = () =>{
    return statusId;
};

const getCategoryRepo = () =>{
    return categoryId;
};

const getPriorityRepo = () =>{
    return priorityId;
};

const getDepartmentRepo = () =>{
    return departmentId;
};

const getUserRepo = () =>{
    return userId;
};

const getCompanyRepo = () => {
    return companyId;
};

const getProjectIndexURepo = (id) => {
    return projects.findIndex(project => project.id === id);
};


const patchProjectRepo = (index, dataToUpdate)=>{
projects[index] = {...projects[index], ...dataToUpdate};
return projects[index];
};


const registerNewProjectRepo = async (project) =>{
    const newProject = { id:(projects.length + 1).toString() ,...project };
    projects.push(newProject);
    return newProject;
};

const deleteProjectURepo = (id) =>{
       // Find the user in the array by ID and update the data
       const projectIndex = projects.findIndex(project => project.id == id);
      console.log('projectIndex',projectIndex);
       if (projectIndex !== -1) {
           return projects.splice(projectIndex, 1);
       } else {
           return null;
       }
};

module.exports = {
    getProjectsRepo,
    getProjectRepo,
    getStatusRepo,
    getCategoryRepo,
    getPriorityRepo,
    getDepartmentRepo,
    getUserRepo,
    getCompanyRepo,
    patchProjectRepo,
    getProjectIndexURepo,
    registerNewProjectRepo,
    deleteProjectURepo
};