exports.fetchStatementData = (accountNumber, fromDate, toDate) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // delay from Core Banking system
      const data = {
        accountNumber,
        fromDate,
        toDate,
        transactions: [
          { date: "01-08-2024", description: "Deposit", amount: 1000 },
          { date: "15-08-2024", description: "Withdrawal", amount: -500 },
        ],
      };
      resolve(data);
    }, 500);
  });
};
