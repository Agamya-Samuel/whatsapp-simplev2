const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

//! Send message to all students
const { sendPromoMessage } = require('./send-message.js');

//! Global Variables
const { test_sample_list, ADMINS } = require('./global-vars.js');
let count = 1;

//! DB Stuff
const { returnStudentsList } = require('./db-handler.js');

//! Utils
const { async_sleep, modify_msg, getRandomSleepNumber } = require('./utils.js');

const client = new Client({
	authStrategy: new LocalAuth(),
	puppeteer: {
		executablePath:
			'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
	},
});

client.on('ready', async () => {
	console.log('Client is ready!');
	await client.sendMessage(`${ADMINS[0]}@c.us`, 'Client is Ready!');
});

client.on('qr', (qr) => {
	qrcode.generate(qr, { small: true });
});

client.initialize();

// Listening to all incoming messages
client.on('message', async (msg) => {
	const msg_received = msg.body;
	const sender = msg.from.split('@')[0];
	console.log('Message received:');
	console.log(`Sender: ${sender}, Message: ${msg_received}`);

	//! If you a valid ADMIN
	if (sender && ADMINS.includes(parseInt(sender))) {
		//! If the message is "START"
		if (msg_received == 'START') {
			// msg.reply('Starting sending messages to all students!');
			// const list_of_students = await returnStudentsList(`shautscollections`);
			const list_of_students = test_sample_list;
			for (let i = 0; i < list_of_students.length; i++) {
				student_doc = list_of_students[i];

				//! Replace the placeholders in the message with the student's name and school name
				wp_msg = modify_msg(student_doc);

				//! The number_id is the WhatsApp ID of the student
				const number_id = `${student_doc.Contact}@c.us`; // the WhatsApp ID

				//! Sending message
				console.log(
					`${count}) Message Sending to -> ${student_doc.Contact}`
				);
				count++;
				sendPromoMessage(client, number_id, student_doc._id);
				await async_sleep(getRandomSleepNumber());
			}
			await client.sendMessage(`${ADMINS[0]}@c.us`, 'All messages sent!');
		}
	}
});
