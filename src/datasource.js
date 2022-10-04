const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const uri = `mongodb://root:test@${DB_HOST}:27017/`;

const client = new MongoClient(uri);

module.exports = {
	connect: async function(callback) {
		try {
			await client.connect();
			let db = await client.db("test");
			await callback(db, client);
		} catch (e) {
			console.log(e);
			throw e;
		} finally {
			await client.close();
		}	
	}
}