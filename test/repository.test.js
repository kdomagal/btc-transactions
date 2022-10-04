'use strict'

const Repository = require('../src/repository');
const {MongoClient} = require('mongodb');

describe('transaction repository', () => {

    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(globalThis.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
    });

    afterEach(async () => {
        await db.collection('transactions').deleteMany({});
    });

    test('should fetch aggregated data', async () => {
        // given
        let repo = new Repository(db);
        const collection = repo.collection;

        // when
        await collection.insertMany(mockTransactions);
        let result = await repo.fetchAggregatedDeposits();

        // then
        expect(result.length).toBe(3);
        assertAggregation(result, 'myAre6hq8uSDAzhmNit1fjkTeajebBzrKZ', 1, 36.9759613);
        assertAggregation(result, 'mvd6qFeVkqH6MNAS2Y2cLifbdaX5XUkbZJ', 2, 60);
        assertAggregation(result, 'mvcyJMiAcSXKAEsQxbW9TYZ369rsMG6rVV', 1, 26);
    });

    test('should fetch max and min deposit amount', async () => {
        // given
        let repo = new Repository(db);
        const collection = repo.collection;

        // when
        await collection.insertMany(mockTransactions);
        let result = await repo.fetchMinMaxDepositAmounts();

        // then
        expect(result.min).toBe(25)
        expect(result.max).toBe(36.9759613)
    });
});

function assertAggregation(arr, id, count, sum) {
    let aggr = arr.find((it) => {
        return it._id === id
    });
    expect(aggr._id).toBe(id);
    expect(aggr.count).toBe(count);
    expect(aggr.sum).toBe(sum);
}

const mockTransactions = [
    {
        "address": "myAre6hq8uSDAzhmNit1fjkTeajebBzrKZ",
        "category": "receive",
        "amount": 36.9759613,
        "confirmations": 42,
        "txid": "dd23e0dfcc3df0e086ffc0f3662f3727fff6e10021bf0d396a7eb7c1f87dc284",
    },
    {
        "address": "mvd6qFeVkqH6MNAS2Y2cLifbdaX5XUkbZJ",
        "category": "receive",
        "amount": 35,
        "confirmations": 12,
        "txid": "17128f5e0364f71a1118323e92c15b6073276f6103b0a589483f19e17bd7b5fd",
    },
    {
        "address": "mvd6qFeVkqH6MNAS2Y2cLifbdaX5XUkbZJ",
        "category": "receive",
        "amount": 25,
        "confirmations": 63,
        "txid": "885239697c45c591917197c139c69656272e56a8c2f0e21bdfb56aa06d11b55e",
    },
    {
        "address": "mzzg8fvHXydKs8j9D2a8t7KpSXpGgAnk4n",
        "category": "receive",
        "amount": 9.19,
        "confirmations": 2,
        "txid": "697c9b177ffd64ce3a9ed4814c08d95254095863f3b07867f7fe0f457c474be2",
    },
    {
        "address": "mgEKePSPD6NF8GTjpWjsgWYqDP9MTxpqmN",
        "category": "send",
        "amount": 7.15,
        "confirmations": 75,
        "txid": "6a8068c75955fc1d9cbfc2017f2f6b69e1e6bcd3eb6d513574d1b2753bbe6152",
    },
    {
        "address": "mvcyJMiAcSXKAEsQxbW9TYZ369rsMG6rVV",
        "category": "generate",
        "amount": 26,
        "confirmations": 75,
        "txid": "ad25086de9e92a30575661c10c42291eba141a6d42a4be907347f60e3d79921a",
    },
];