const mongoose = require('mongoose');

const { mongo_url } = require('./global-vars.js');

//! DB Stuff
async function returnStudentsList(collectionName) {
	const uri = mongo_url;
	try {
		await mongoose.connect(uri);
		console.log('Connected to MongoDB');

		//! You can perform database operations here
		const studentSchema = new mongoose.Schema(
			{
				Name: String,
				Contact: Number,
			},
			{ versionKey: false }
		);

		const Student = mongoose.model(collectionName, studentSchema);
		return await Student.find({});
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
}

module.exports = { returnStudentsList };
