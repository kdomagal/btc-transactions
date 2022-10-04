'use strict';

const datasource = require('./src/datasource');
const Repository = require('./src/repository');
const Summary = require('./src/summary');

const { transactions } = require('./src/transactions');

datasource.connect(async function(db) {
	let transactionsRepository = new Repository(db);
	await transactionsRepository.bulkUpsert(transactions);

	let aggregatedDeposits = await transactionsRepository.fetchAggregatedDeposits();

	let summary = new Summary(aggregatedDeposits, transactionsRepository);
	summary = await summary.build();

	console.log(summary.toString());
});
