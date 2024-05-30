//! Send message to all students
async function sendPromoMessage(
	client,
	number_id,
	wp_msg = '',
	msg_type = 'image'
) {
	const { MessageMedia } = require('whatsapp-web.js');
	//! Image
	if (msg_type == 'image') {
		const image = MessageMedia.fromFilePath(
			'./wp-media/shuats_brochure_2024.jpg'
		);
		await client.sendMessage(number_id, image, { caption: wp_msg });
		// await async_sleep(sleep_duration);
		return;
	}

	//! Video
	if (msg_type == 'video') {
		const video = MessageMedia.fromFilePath(
			'./wp-media/shuats_video_compressed.mp4'
		);
		await client.sendMessage(number_id, video, { caption: wp_msg });
		// await async_sleep(sleep_duration);
		return;
	}

	//! PDF
	if (msg_type == 'pdf') {
		const pdf = MessageMedia.fromFilePath(
			'./wp-media/Prospectus_2024new.pdf'
		);
		await client.sendMessage(number_id, pdf, { caption: wp_msg });
		// await async_sleep(sleep_duration);

		return;
	}
}

module.exports = { sendPromoMessage };
