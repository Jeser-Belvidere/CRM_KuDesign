const Router = require('express')
const projectController = require('../controllers/project.controller')
const router = new Router()

router.post('/project', projectController.createProject)
router.get('/project', projectController.getProject)
router.put('/project', projectController.updateProject)
router.delete('/project', projectController.deleteProject)


module.exports = router