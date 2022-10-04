'use strict'

module.exports = class Repository {
	constructor(db) {
		this.collection = db.collection('transactions');
		this.collection.createIndex({ category: 1, confirmations: 1});
	}

	async bulkUpsert(transactions) {
		let bulk = this.collection.initializeOrderedBulkOp();

		// deduplicate on txid, merge vout
		transactions.forEach(t => {
			bulk.find({txid: t.txid}).upsert().updateOne({'$setOnInsert': t});
		});

		return await bulk.execute();
	};

	async fetchAggregatedDeposits() {
		let aggr = this.collection.aggregate([
			{
				$match: matchAggregationFilter
			},
			{
				$group: {  
					_id: "$address",
					count: { $sum: 1 },
					sum: { $sum: "$amount" }
				}
			}	
		]);

		return await aggr.toArray();
	};

	async fetchMinMaxDepositAmounts() {
		let aggr = this.collection.aggregate([
			{
				$match: matchAggregationFilter
			},
			{
				$group: {
					"_id": null,
					max: { "$max": "$amount"},
					min: { "$min": "$amount"}
				}
			}
		]);

		return await aggr.next();
	};
};

const matchAggregationFilter = {
	category: { $in: ['receive', 'generate']}, // ignore 'immature' or 'spend' category
	confirmations: { $gte: 6 },
	amount: { $gt: 0 }
};