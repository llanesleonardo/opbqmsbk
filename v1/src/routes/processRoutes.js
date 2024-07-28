const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
//const { validateJWT } = require('../services/auth/index');
const {
    getProjects,
    getProject,
    getProjectDataForForm,
    newProject,
    patchProject,
    deleteProject
} = require('../controllers/projectController');



// All projects Profile
router.get('/', getProjects);

//This endpoint is just for testing ( the data will come from Context)
router.get('/fill',getProjectDataForForm);


// Create new project
router.post('/',newProject);

// Project Profile
router.get('/:id',getProject);

// Patch project
router.patch('/:id',patchProject);


// Delete project
router.delete('/:id',deleteProject);



module.exports = router;