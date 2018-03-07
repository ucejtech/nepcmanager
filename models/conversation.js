const mongoose = require('mongoose'), 
	  Schema = mongoose.Schema;

// Schema defines how chat will be stored in mongoDB
// hold the participants of the conversation and generate an ID for the conversation
const ConversationSchema = new Schema({
	participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Conversation', ConversationSchema);	