const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const projectsSchema = new Schema({
	project_title : {
		type: String,
		default: 'Project Title',
		required: true
	},
	project_description: { type: String, default: 'new project'},
	lead_team: {
		type: String,
		default: "None"
	},
	collab_team: {
		type: Array
	},
	tasks: {
		type: Array,
		required: false,
		default: ['task1', 'task2']
	},
	progress: {
		type: Number,
		default: 0
	},
	status: {
		started: { type: Boolean, default: false },
		conpleted: { type: Boolean, default: false }

	}

});

module.exports = mongoose.model('projects', projectsSchema);
