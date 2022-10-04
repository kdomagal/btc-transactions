'use strict'

const Summary = require('../src/summary');

describe('summary', () => {

    test('should build summary data and print', async () => {
        // given
        let summary = new Summary(aggregatedDeposits, dbMock);

        // when
        await summary.build();
        let output = summary.toString();

        // then
        expect(Object.keys(summary.knownCustomers).length).toBe(7);
        let customer = summary.knownCustomers['mzzg8fvHXydKs8j9D2a8t7KpSXpGgAnk4n'];
        expect(customer.name).toBe('Jonathan Archer');
        expect(customer.count).toBe(19);
        expect(customer.sum).toBe(97.49);

        expect(summary.noRefDeposits.count).toBe(8);
        expect(summary.noRefDeposits.sum).toBe(428.00690896);
        expect(summary.minMaxAmounts.min).toBe(11);
        expect(summary.minMaxAmounts.max).toBe(98.04437945);

        expect(output).toBe(expectedOutput);
    });
});

const dbMock = {
    fetchMinMaxDepositAmounts: async function() {
        return new Promise(resolve => {
            resolve({ min: 11, max: 98.04437945 });
        });
    }
};

const aggregatedDeposits = [
    {
        _id: 'miTHhiX3iFhVnAEecLjybxvV5g8mKYTtnM',
        count: 22,
        sum: 1210.60058269
    },
    {
        _id: 'mgA5rCr9xqmJW9x9KP11jkgAJfDzvZKuQA',
        count: 2,
        sum: 11.12906751
    },
    {
        _id: 'muDwtNDAAn8348s9pey4CqTeTZR8pUsR9v',
        count: 1,
        sum: 98.04437945
    },
    {
        _id: '2N1SP7r92ZZJvYKG2oNtzPwYnzw62up7mTo',
        count: 15,
        sum: 71.83
    },
    {
        _id: 'mmFFG4jqAtw9MoCC88hw5FNfreQWuEHADp',
        count: 18,
        sum: 97
    },
    {
        _id: 'mutrAf4usv3HKNdpLwVD4ow2oLArL6Rez8',
        count: 27,
        sum: 131.93253
    },
    {
        _id: 'ms6a8G3J5XcYiGJbyPHd9AAQ2FFVRRWDZt',
        count: 1,
        sum: 68.3270907
    },
    {
        _id: 'muxu2q6v7uzsxiRLReX5XkFqCCfzke2KHK',
        count: 1,
        sum: 92.61634743
    },
    {
        _id: 'mzVyNg9tw4cjL3QnBhRVpRwRgxBDQTsaiV',
        count: 1,
        sum: 93.21009929
    },
    {
        _id: 'mjr6f8iYNWcWp7ThSS45hJvxCi62SXWGmL',
        count: 1,
        sum: 21.94627784
    },
    {
        _id: 'mzzg8fvHXydKs8j9D2a8t7KpSXpGgAnk4n',
        count: 19,
        sum: 97.49
    },
    {
        _id: 'mjWKAnQnPt6EmnE8E1ykz5C7nkAeDnC5U9',
        count: 1,
        sum: 42.73364674
    },
    {
        _id: 'mvd6qFeVkqH6MNAS2Y2cLifbdaX5XUkbZJ',
        count: 12,
        sum: 57.73
    },
    {
        _id: 'mvcyJMiAcSXKAEsQxbW9TYZ369rsMG6rVV',
        count: 11,
        sum: 28.62734149
    }
];

const expectedOutput = `Deposited for Wesley Crusher: count=12 sum=57.73000000
Deposited for Leonard McCoy: count=18 sum=97.00000000
Deposited for Jonathan Archer: count=19 sum=97.49000000
Deposited for Jadzia Dax: count=15 sum=71.83000000
Deposited for Montgomery Scott: count=27 sum=131.93253000
Deposited for James T. Kirk: count=22 sum=1210.60058269
Deposited for Spock: count=11 sum=28.62734149
Deposited without reference: count=8 sum=428.00690896
Smallest valid deposit: 11.00000000
Largest valid deposit: 98.04437945`;