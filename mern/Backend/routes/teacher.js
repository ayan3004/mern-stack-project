const express = require('express');
const routes = express.Router();
const authantication = require('../middleware/authantication')
const controller = require('../controller/teacherCtl')

routes.get('/viewCourse',authantication, controller.viewCourse);

routes.post('/addCourse',authantication, controller.createCourse)

routes.delete('/deleteCourse',authantication, controller.deleteCourse)

routes.put('/editCourse',authantication, controller.editCourse)

routes.get('/enroll',authantication,controller.enroll)


module.exports = routes