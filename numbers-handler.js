const mongoose = require('mongoose');
const { mongo_url, collection_name } = require('./global-vars');

const dbNamesSuffix = ['one', 'two', 'three', 'four', 'five'];

// Define the schema for the student documents
const studentSchema = new mongoose.Schema(
	{
		Name: String,
		Contact: Number,
	},
	{ versionKey: false }
);

const Student = mongoose.model(collection_name, studentSchema);

async function main() {
	// Connect to the MongoDB database
	await mongoose.connect(mongo_url);
	console.log('Connected to MongoDB');

	// Fetch all documents from the students collection
	const students = await Student.find({});
	const totalDocuments = students.length;

	console.log(`Total documents: ${totalDocuments}`);

	// Determine the size of each section
	const sectionSize = Math.ceil(totalDocuments / 5);
	const sections = [];

	// Divide the documents into 5 sections
	for (let i = 0; i < 5; i++) {
		const startIdx = i * sectionSize;
		const endIdx = startIdx + sectionSize;
		sections.push(students.slice(startIdx, endIdx));
	}

	let count = 0;
	// Insert each section into a new collection
	for (let i = 0; i < 5; i++) {
		const Section = mongoose.model(
			`section-${dbNamesSuffix[i]}-s`,
			studentSchema
		);
		await Section.insertMany(sections[i]);
		count += sections[i].length;
		console.log(
			`Inserted ${sections[i].length} documents into Section${i + 1}`
		);
	}
	console.log(`Total documents inserted: ${count} / ${totalDocuments}`);

	// Close the database connection
	mongoose.connection.close();
}

// main().catch((err) => console.error(err));

module.exports = { dbNamesSuffix };
