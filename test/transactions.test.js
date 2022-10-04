'use strict'

test('should concat transactions from json files', () => {
    //when
    const { transactions } = require('../src/transactions');

    //then
    expect(transactions[0].txid).toBe('dd23e0dfcc3df0e086ffc0f3662f3727fff6e10021bf0d396a7eb7c1f87dc284');
    expect(transactions[171].txid).toBe('3d4e6fb2ec9a881148a22f5eedf09a4ec61908aa7b7225a20b18f8a526d16d97');
    expect(transactions[172].txid).toBe('2c1212495b23f32f93fb9ac02eb9c683fc14533ca12146ac512e2967e5ee1b74');
    expect(transactions[transactions.length-1].txid).toBe('738bf51cd19aa40d7da99caa6dc89435003102025da1e4dd3e7f6171231f46b9');
});