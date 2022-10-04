'use strict'

const block1 = require("../transactions-1.json");
const block2 = require("../transactions-2.json");

module.exports ={
    transactions: parseTransactionsFromJson()
};

function parseTransactionsFromJson() {
    return block1.transactions.concat(block2.transactions);
}