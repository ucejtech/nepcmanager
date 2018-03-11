var projectModel = require('../models/projectModel.js');

/**
 * projectController.js
 *
 * @description :: Server-side logic for managing projects.
 */
module.exports = {

    /**
     * projectController.list()
     */
    list: function (req, res) {
        projectModel.find(function (err, project) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting project.',
                    error: err
                });
            }
            return res.json(project);
        });
    },

    /**
     * projectController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        projectModel.findOne({_id: id}, function (err, project) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting project.',
                    error: err
                });
            }
            if (!project) {
                return res.status(404).json({
                    message: 'No such project'
                });
            }
            return res.json(project);
        });
    },

    /**
     * projectController.create()
     */
    create: function (req, res) {
        var project = new projectModel({
			project_title  : req.body.project_title ,
            project_description : req.body.project_description,
			lead_team : req.body.lead_team,
			collab_team : req.body.collab_team,
			
        });

        project.save(function (err, project) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating project',
                    error: err
                });
            }
            console.log(project);
            res.status(201).
            redirect('/dashboard');
        });
    },

    /**
     * projectController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        projectModel.findOne({_id: id}, function (err, project) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting project',
                    error: err
                });
            }
            if (!project) {
                return res.status(404).json({
                    message: 'No such project'
                });
            }

            project.project_name  = req.body.project_name  ? req.body.project_name  : project.project_name ;
			project.lead_team = req.body.lead_team ? req.body.lead_team : project.lead_team;
			project.collab_team = req.body.collab_team ? req.body.collab_team : project.collab_team;
			project.progress = req.body.progress ? req.body.progress : project.progress;
			
            project.save(function (err, project) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating project.',
                        error: err
                    });
                }

                return res.json(project);
            });
        });
    },


    /**
     * projectController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        projectModel.findByIdAndRemove(id, function (err, project) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the project.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
