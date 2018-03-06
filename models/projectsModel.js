var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var projectsSchema = new Schema({
	'project_name ' : String,
	'lead_team' : String,
	'collab_team' : Array,
	'progress' : Number
});

module.exports = mongoose.model('projects', projectsSchema);
