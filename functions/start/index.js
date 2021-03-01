const Pusher = require('pusher');
const jobs = require('../jobs.json');
const qualifications = require('../qualifications.json');

const client = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu"
});

const sortRandom = () => 0.5 - Math.random();
const qualificationCount = 5;

exports.handler = async function(event, context) {

	const response = await client.get({ path: "/channels/presence-hired-test/users" });
	const { users } = await response.json();

	const participants = users.filter(user => user.id.includes('user'));
	const [boss, ...remainingPlayers] = participants.sort(sortRandom);
	const job = jobs.sort(sortRandom)[0];
	const randomQualifications = qualifications.sort(sortRandom);

	const traits = remainingPlayers.reduce((acc, player, index) => {
		const startIndex = index * qualificationCount;
		const playerTraits = randomQualifications.slice(startIndex, startIndex + qualificationCount)
		acc[player.id] = playerTraits;
		return acc;
	}, {});

	client.trigger('presence-hired-test', 'message', {
		event: 'game-start',
		data: {
			job,
			boss: boss.id,
			traits
		}
	});

	return {
		statusCode: 200
	};
}
