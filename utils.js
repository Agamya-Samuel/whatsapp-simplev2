const { promo_msg, sleep_duration } = require('./global-vars.js');

//! generate a function to generate random hex strings, takes in two arguments, length and count, where length is the length of the hex string and count is the number of hex strings to generate
function randomHex(length, count) {
	let hexStrings = [];
	for (let i = 0; i < count; i++) {
		let hexString = '';
		for (let j = 0; j < length; j++) {
			hexString += Math.floor(Math.random() * 16).toString(16);
		}
		hexStrings.push(hexString);
	}
	return hexStrings;
}

//! format string
function formatString(template, ...values) {
	return template.replace(/{(\d+)}/g, (match, index) => {
		return typeof values[index] !== 'undefined' ? values[index] : match;
	});
}

//! Synchronous sleep function
function async_sleep(ms) {
	console.log(`Sleeping for ${ms / 1000} seconds`);
	return new Promise((resolve) => setTimeout(resolve, ms));
}

//! Final modify message function
function modify_msg(student_doc) {
	const randomStringList = randomHex(4, 2);
	let wp_msg = formatString(
		promo_msg,
		randomStringList[0],
		randomStringList[1]
	);
	if (student_doc.Name)
		wp_msg = wp_msg.replace('{student_name}', student_doc.Name);
	else wp_msg = wp_msg.replace('{student_name}', 'Student');
	if (student_doc.School)
		wp_msg = wp_msg.replace('{school_name}', student_doc.School);
	else wp_msg = wp_msg.replace('{school_name}', '');
	return wp_msg;
}

//! Random Number Generator
const getRandomSleepNumber = ({ min, max } = sleep_duration) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = {
	randomHex,
	formatString,
	async_sleep,
	modify_msg,
	getRandomSleepNumber,
};
