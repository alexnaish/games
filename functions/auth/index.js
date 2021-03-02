const querystring = require('querystring');
const Pusher = require('pusher');

function upperCaseFirst (word) {
	return word.charAt(0).toUpperCase() + word.slice(1)
}
function generateName(){
  const adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry",
  "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring",
  "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered",
  "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
  "long", "late", "lingering", "bold", "little", "morning", "muddy", "old",
  "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
  "wandering", "withered", "wild", "black", "young", "holy", "solitary",
  "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
  "polished", "ancient", "purple", "lively", "nameless"]

  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea",
  "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn",
  "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird",
  "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower",
  "firefly", "feather", "grass", "haze", "mountain", "night", "pond",
  "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf",
  "thunder", "violet", "water", "wildflower", "wave", "water", "resonance",
  "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
  "frog", "smoke", "star"];

  return `${upperCaseFirst(adjs[Math.floor(Math.random()*(adjs.length-1))])} ${upperCaseFirst(nouns[Math.floor(Math.random()*(nouns.length-1))])}`;
}

const client = new Pusher({
	appId: process.env.PUSHER_APP_ID,
	key: process.env.PUSHER_KEY,
	secret: process.env.PUSHER_SECRET,
	cluster: "eu"
});

exports.handler = async function(event, context) {
	const { prefix } = event.queryStringParameters;
	const { channel_name, socket_id } = querystring.parse(event.body);

	if (!prefix || !channel_name || !socket_id) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: 'Missing payload.' })
		}
	}

	if (prefix === 'user') {
		const { users = [] } = await client.get({ path: `/channels/${channel_name}/users` }).then(res => res.json());
		if (!users.length || !users.find(user => user.id.includes('game'))) {
			return {
				statusCode: 403,
				body: JSON.stringify({ error: 'Room does not exist.' })
			}
		}
	}

	const presenceData = {
    user_id: `${prefix}-${Date.now()}`,
    user_info: {
      name: generateName()
    }
  };
  const auth = client.authenticate(socket_id, channel_name, presenceData);

	return {
		statusCode: 200,
		body: JSON.stringify(auth)
	};
}
