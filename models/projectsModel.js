const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const projectsSchema = new Schema({
	project_title : {
		type: String,
		default: 'Project Title'
	},
	lead_team: {
		type: String,
		default: "None"
	},
	collab_team: {
		type: Array
	}
	tasks: {
		iceblock: {
			type: Array
		},
		ongoing: {
			type: Array
		},
		completed: {
			type: Array
		}
	},
	progress: {
		type: Number,
		default: 0
	}

});

module.exports = mongoose.model('projects', projectsSchema);
