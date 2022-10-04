'use strict'

module.exports = class Summary {

    knownCustomers = {
        'mvd6qFeVkqH6MNAS2Y2cLifbdaX5XUkbZJ': { name: 'Wesley Crusher' },
        'mmFFG4jqAtw9MoCC88hw5FNfreQWuEHADp': { name: 'Leonard McCoy' },
        'mzzg8fvHXydKs8j9D2a8t7KpSXpGgAnk4n': { name: 'Jonathan Archer' },
        '2N1SP7r92ZZJvYKG2oNtzPwYnzw62up7mTo':{ name: 'Jadzia Dax' },
        'mutrAf4usv3HKNdpLwVD4ow2oLArL6Rez8': { name: 'Montgomery Scott' },
        'miTHhiX3iFhVnAEecLjybxvV5g8mKYTtnM': { name: 'James T. Kirk' },
        'mvcyJMiAcSXKAEsQxbW9TYZ369rsMG6rVV': { name: 'Spock' }
    };

    constructor(aggregatedDeposits, repository) {
        this.deposits = aggregatedDeposits;
        this.repository = repository;
    };

    async build() {
        this.noRefDeposits = { count: 0, sum: 0};

        this.deposits.forEach(deposit => {
            let customer = this.knownCustomers[deposit._id];
            if (customer) {
                customer.count = deposit.count;
                customer.sum = deposit.sum;
            } else {
                this.noRefDeposits.count += deposit.count;
                this.noRefDeposits.sum += deposit.sum;
            }
        });
        this.minMaxAmounts = await this.repository.fetchMinMaxDepositAmounts();
        return this;
    };

    toString() {
        this.output = "";

        Object.values(this.knownCustomers).forEach( c => {
           this.output += `Deposited for ${c.name}: count=${c.count} sum=${formatAmount(c.sum)}\n`;
        });
        this.output += `Deposited without reference: count=${this.noRefDeposits.count} sum=${formatAmount(this.noRefDeposits.sum)}\n`;
        this.output += `Smallest valid deposit: ${formatAmount(this.minMaxAmounts.min)}\n`;
        this.output += `Largest valid deposit: ${formatAmount(this.minMaxAmounts.max)}`;
        return this.output;
    }
}

function formatAmount(amount) {
    return parseFloat(amount).toFixed(8);
}