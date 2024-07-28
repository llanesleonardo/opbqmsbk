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

/**
 * @swagger
 * tags:
 *  name: Projects
 *  description: API endpoints to manage Projects 
 */



/**
 * @swagger
 * /api/project:
 *   get:
 *     summary: Get all projects.
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: The list of all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:              
 *                 $ref: '#/components/schemas/Projects'
 *       400:
 *         $ref: '#/components/responses/400'
 */

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