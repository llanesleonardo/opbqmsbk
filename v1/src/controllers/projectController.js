const {
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
} = require('../database/repositories/projectRepository');
require('dotenv').config();



const getProjects = (req, res) => {
    const projects = getProjectsRepo();
    res.json(
        {
        projects:projects,columns:[
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

const getProjectDataForForm = (req,res) =>{

    const status = getStatusRepo();
    const category = getCategoryRepo();
    const priority = getPriorityRepo();
    const department = getDepartmentRepo();
    const user = getUserRepo();
    const company = getCompanyRepo();
    
    res.status(200).json({ 'projectData': {user,company},'defaultTables':{status,category,priority, department} });
};

const newProject = async (req,res) =>{
    
    try {
        const newPorject = await registerNewProjectRepo(req.body.data);
        res.status(201).json(newPorject);
    } catch (error) {
        res.status(500).json('error', error);
    }

};



const getProject = (req,res) =>{
    const projectsData =  getProjectRepo();
    const projectData = projectsData.find(project => project.id === req.params.id);
    const status = getStatusRepo();
    const category = getCategoryRepo();
    const priority = getPriorityRepo();
    const department = getDepartmentRepo();
    //console.log('projectData',projectData);
    res.status(200).json({ projectData ,'defaultTables':{status,category,priority, department} });
    
};



const patchProject = (req,res) =>{
    try {
    const projectId = req.params.id;
    const updatedData = req.body;
    // Find the user in the array by ID and update the data
    const projectIndex = getProjectIndexURepo(projectId);
    if (projectIndex !== -1) {
        const updatedProject = patchProjectRepo(projectIndex,updatedData.data);
        res.json({ message: 'Project updated successfully', project: updatedProject });

    }else{
        res.status(200).json(updatedProject);
    }
 

} catch (error) {
    res.status(500).json(error);
}
}


const deleteProject = (req,res)=>{
    try {
        const projectId = req.params.id;
        const projectDeleted = deleteProjectURepo(projectId);
        if (!projectDeleted) {
            res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully', projectDeleted});

    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { getProjects, getProject,getProjectDataForForm, newProject,patchProject,deleteProject};