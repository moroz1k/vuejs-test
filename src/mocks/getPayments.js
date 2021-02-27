export default (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: 1,
            name: 'Bob Lee',
            amount: 15000,
            date: '2020-02-24',
          },
          {
            id: 2,
            name: 'John Seek',
            amount: 3000,
            date: '2020-02-25',
          },
          {
            id: 3,
            name: 'Harry Smith',
            amount: 21000.45,
            date: '2020-02-26',
          },
          {
            id: 4,
            name: 'Alex Morphy',
            amount: 150.99,
            date: '2020-02-27',
          },
          {
            id: 5,
            name: 'Ben Gold',
            amount: 10000000,
            date: '2020-02-28',
          },
          {
            id: 6,
            name: 'Tim Black',
            amount: 0,
            date: '2020-02-28',
          },
          {
            id: 7,
            name: 'Jimmy Elephant',
            amount: 7503.60,
            date: '2020-02-30',
          },
        ],
      });
    }, 500);
  });
};
