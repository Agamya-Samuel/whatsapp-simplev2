const { Client, LocalAuth } = require('whatsapp-web.js');
const mongoose = require('mongoose');
const qrcode = require('qrcode-terminal');

const { mongo_url } = require('./global-vars.js');
const { ADMINS } = require('./global-vars.js');
const { dbNamesSuffix } = require('./numbers-handler.js');
const { returnStudentsList } = require('./db-handler.js');
const { async_sleep, modify_msg, getRandomSleepNumber } = require('./utils.js');
const { sendPromoMessage } = require('./send-message.js');

let gCount = 1;
let start_sending_msg = false;

// Load the session data
mongoose.connect(mongo_url).then(async () => {
	createClientMaster();
	createClientOne();
	createClientTwo();
	// createClientThree();
	// createClientFour();
	// createClientFive();
});


//! When the Clients are ready
function clientMasterIsReady(clientMaster) {
	clientMaster.on('message', async (msg) => {
		const msg_received = msg.body;
		const sender = msg.from.split('@')[0];
		//! If you a valid ADMIN
		if (sender && ADMINS.includes(parseInt(sender))) {
			//! If the message is "START"
			if (msg_received == 'START') {
				start_sending_msg = true;
			}
		}
	});
}

function clientOneIsReady(client1) {
	const intervalId = setInterval(async () => {
		if (start_sending_msg) {
			clearInterval(intervalId);
			const studentsList = await returnStudentsList(
				`section-${dbNamesSuffix[0]}-s`
			);
			for (let i = 0; i < studentsList.length; i++) {
				const student_doc = studentsList[i];

				//! Replace the placeholders in the message with the student's name and school name
				let wp_msg = modify_msg(student_doc);

				//! The number_id is the WhatsApp ID of the student
				const number_id = `${student_doc.Contact}@c.us`; // the WhatsApp ID

				//! Sending message
				console.log(
					`${gCount} / ${i + 1}) Client-${
						dbNamesSuffix[0]
					} -> Message Sending to -> ${student_doc.Contact}`
				);
				gCount++;
				sendPromoMessage(client1, number_id, wp_msg);
				await async_sleep(getRandomSleepNumber());
			}
		}
	}, 5000); // Check every 5 seconds
}

function clientTwoIsReady(client2) {
	const intervalId = setInterval(async () => {
		if (start_sending_msg) {
			clearInterval(intervalId);
			const studentsList = await returnStudentsList(
				`section-${dbNamesSuffix[1]}-s`
			);
			for (let i = 0; i < studentsList.length; i++) {
				const student_doc = studentsList[i];

				//! Replace the placeholders in the message with the student's name and school name
				let wp_msg = modify_msg(student_doc);

				//! The number_id is the WhatsApp ID of the student
				const number_id = `${student_doc.Contact}@c.us`; // the WhatsApp ID

				//! Sending message
				console.log(
					`${gCount} / ${i + 1}) Client-${
						dbNamesSuffix[1]
					} -> Message Sending to -> ${student_doc.Contact}`
				);
				gCount++;
				sendPromoMessage(client2, number_id, wp_msg);
				await async_sleep(getRandomSleepNumber());
			}
		}
	}, 5000); // Check every 5 seconds
}

function clientThreeIsReady(client3) {
	const intervalId = setInterval(async () => {
		if (start_sending_msg) {
			clearInterval(intervalId);
			const studentsList = await returnStudentsList(
				`section-${dbNamesSuffix[2]}-s`
			);
			for (let i = 0; i < studentsList.length; i++) {
				const student_doc = studentsList[i];

				//! Replace the placeholders in the message with the student's name and school name
				let wp_msg = modify_msg(student_doc);

				//! The number_id is the WhatsApp ID of the student
				const number_id = `${student_doc.Contact}@c.us`; // the WhatsApp ID

				//! Sending message
				console.log(
					`${gCount} / ${i + 1}) Client-${
						dbNamesSuffix[2]
					} -> Message Sending to -> ${student_doc.Contact}`
				);
				gCount++;
				sendPromoMessage(client3, number_id, wp_msg);
				await async_sleep(getRandomSleepNumber());
			}
		}
	}, 5000); // Check every 5 seconds
}

function clientFourIsReady(client4) {
	const intervalId = setInterval(async () => {
		if (start_sending_msg) {
			clearInterval(intervalId);
			const studentsList = await returnStudentsList(
				`section-${dbNamesSuffix[3]}-s`
			);
			for (let i = 0; i < studentsList.length; i++) {
				const student_doc = studentsList[i];

				//! Replace the placeholders in the message with the student's name and school name
				let wp_msg = modify_msg(student_doc);

				//! The number_id is the WhatsApp ID of the student
				const number_id = `${student_doc.Contact}@c.us`; // the WhatsApp ID

				//! Sending message
				console.log(
					`${gCount} / ${i + 1}) Client-${
						dbNamesSuffix[3]
					} -> Message Sending to -> ${student_doc.Contact}`
				);
				gCount++;
				sendPromoMessage(client4, number_id, wp_msg);
				await async_sleep(getRandomSleepNumber());
			}
		}
	}, 5000); // Check every 5 seconds
}

function clientFiveIsReady(client5) {
	const intervalId = setInterval(async () => {
		if (start_sending_msg) {
			clearInterval(intervalId);
			const studentsList = await returnStudentsList(
				`section-${dbNamesSuffix[4]}-s`
			);
			for (let i = 0; i < studentsList.length; i++) {
				const student_doc = studentsList[i];

				//! Replace the placeholders in the message with the student's name and school name
				let wp_msg = modify_msg(student_doc);

				//! The number_id is the WhatsApp ID of the student
				const number_id = `${student_doc.Contact}@c.us`; // the WhatsApp ID

				//! Sending message
				console.log(
					`${gCount} / ${i + 1}) Client-${
						dbNamesSuffix[4]
					} -> Message Sending to -> ${student_doc.Contact}`
				);
				gCount++;
				sendPromoMessage(client5, number_id, wp_msg);
				await async_sleep(getRandomSleepNumber());
			}
		}
	}, 5000); // Check every 5 seconds
}

//! Creating the Clients
async function createClientMaster() {
	const clientMaster = new Client({
		authStrategy: new LocalAuth({
			clientId: 'client-master',
		}),
		puppeteer: {
			executablePath:
				'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
		},
	});

	clientMaster.on('ready', async () => {
		console.log('Client-Master is ready!');
		await clientMaster.sendMessage(
			`${ADMINS[0]}@c.us`,
			'Client-Master is Ready!'
		);
		clientMasterIsReady(clientMaster);
	});

	clientMaster.on('qr', (qr) => {
		console.log('QR RECEIVED FOR CLIENT MASTER');
		qrcode.generate(qr, { small: true });
	});

	clientMaster.initialize();
}

async function createClientOne() {
	const client1 = new Client({
		authStrategy: new LocalAuth({
			clientId: 'client-one',
		}),
		puppeteer: {
			executablePath:
				'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
		},
	});

	client1.on('ready', async () => {
		console.log('Client-One is ready!');
		await client1.sendMessage(`${ADMINS[0]}@c.us`, 'Client-One is Ready!');
		clientOneIsReady(client1);
	});

	client1.on('qr', (qr) => {
		console.log('QR RECEIVED FOR CLIENT 1');
		qrcode.generate(qr, { small: true });
	});

	client1.initialize();
}

async function createClientTwo() {
	const client2 = new Client({
		authStrategy: new LocalAuth({
			clientId: 'client-two',
		}),
		puppeteer: {
			executablePath:
				'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
		},
	});

	client2.on('ready', async () => {
		console.log('Client-Two is ready!');
		await client2.sendMessage(`${ADMINS[0]}@c.us`, 'Client-Two is Ready!');
		clientTwoIsReady(client2);
	});

	client2.on('qr', (qr) => {
		console.log('QR RECEIVED FOR CLIENT 2');
		qrcode.generate(qr, { small: true });
	});

	client2.initialize();
}

async function createClientThree() {
	const client3 = new Client({
		authStrategy: new LocalAuth({
			clientId: 'client-three',
		}),
		puppeteer: {
			executablePath:
				'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
		},
	});

	client3.on('ready', async () => {
		console.log('Client-Three is ready!');
		await client3.sendMessage(
			`${ADMINS[0]}@c.us`,
			'Client-Three is Ready!'
		);
		clientThreeIsReady(client3);
	});

	client3.on('qr', (qr) => {
		console.log('QR RECEIVED FOR CLIENT 3');
		qrcode.generate(qr, { small: true });
	});

	client3.initialize();
}

async function createClientFour() {
	const client4 = new Client({
		authStrategy: new LocalAuth({
			clientId: 'client-four',
		}),
		puppeteer: {
			executablePath:
				'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
		},
	});

	client4.on('ready', async () => {
		console.log('Client-Four is ready!');
		await client4.sendMessage(`${ADMINS[0]}@c.us`, 'Client-Four is Ready!');
		clientFourIsReady(client4);
	});

	client4.on('qr', (qr) => {
		console.log('QR RECEIVED FOR CLIENT 4');
		qrcode.generate(qr, { small: true });
	});

	client4.initialize();
}

async function createClientFive() {
	const client5 = new Client({
		authStrategy: new LocalAuth({
			clientId: 'client-five',
		}),
		puppeteer: {
			executablePath:
				'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
		},
	});

	client5.on('ready', async () => {
		console.log('Client-Five is ready!');
		await client5.sendMessage(`${ADMINS[0]}@c.us`, 'Client-Five is Ready!');
		clientFiveIsReady(client5);
	});

	client5.on('qr', (qr) => {
		console.log('QR RECEIVED FOR CLIENT 5');
		qrcode.generate(qr, { small: true });
	});

	client5.initialize();
}
