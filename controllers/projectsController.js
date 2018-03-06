var projectsModel = require('../models/projectsModel.js');

/**
 * projectsController.js
 *
 * @description :: Server-side logic for managing projectss.
 */
module.exports = {

    /**
     * projectsController.list()
     */
    list: function (req, res) {
        projectsModel.find(function (err, projectss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting projects.',
                    error: err
                });
            }
            return res.json(projectss);
        });
    },

    /**
     * projectsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        projectsModel.findOne({_id: id}, function (err, projects) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting projects.',
                    error: err
                });
            }
            if (!projects) {
                return res.status(404).json({
                    message: 'No such projects'
                });
            }
            return res.json(projects);
        });
    },

    /**
     * projectsController.create()
     */
    create: function (req, res) {
        var projects = new projectsModel({
			project_name  : req.body.project_name ,
			lead_team : req.body.lead_team,
			collab_team : req.body.collab_team,
			progress : req.body.progress

        });

        projects.save(function (err, projects) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating projects',
                    error: err
                });
            }
            return res.status(201).json(projects);
        });
    },

    /**
     * projectsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        projectsModel.findOne({_id: id}, function (err, projects) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting projects',
                    error: err
                });
            }
            if (!projects) {
                return res.status(404).json({
                    message: 'No such projects'
                });
            }

            projects.project_name  = req.body.project_name  ? req.body.project_name  : projects.project_name ;
			projects.lead_team = req.body.lead_team ? req.body.lead_team : projects.lead_team;
			projects.collab_team = req.body.collab_team ? req.body.collab_team : projects.collab_team;
			projects.progress = req.body.progress ? req.body.progress : projects.progress;
			
            projects.save(function (err, projects) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating projects.',
                        error: err
                    });
                }

                return res.json(projects);
            });
        });
    },

    /**
     * projectsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        projectsModel.findByIdAndRemove(id, function (err, projects) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the projects.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
