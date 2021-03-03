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

const recognisedGames = ['hired'];

exports.handler = async function(event, context) {
	const { code, game } = event.queryStringParameters;

	if (!code || code.length !== 4 || !recognisedGames.includes(game)) {
		return {
			statusCode: 400
		}
	}
	const channelName = `presence-${game}-${code}`;
	const response = await client.get({ path: `/channels/${channelName}/users` });
	const { users } = await response.json();
	if (users.length < 3) {
		return {
			statusCode: 400
		}
	}

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

	client.trigger(channelName, 'message', {
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
