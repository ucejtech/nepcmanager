var express = require('express');
var router = express.Router();
var projectsController = require('../controllers/projectsController.js');

/*
 * GET
 */
router.get('/', projectsController.list);

/*
 * GET ONE
 */
router.get('/:id', projectsController.show);

/*
 * POST
 */
router.post('/', projectsController.create);

/*
 * PUT
 */
router.put('/:id', projectsController.update);

/*
 * DELETE
 */
router.delete('/:id', projectsController.remove);

module.exports = router;
