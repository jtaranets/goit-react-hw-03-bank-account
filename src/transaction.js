import uuid from 'uuid';

const transactionHistory = [];

const fill = array => {
  const choice = ['Withdrawal', 'Deposit'];
  const t = () => {
    const option = Math.floor(Math.random() * choice.length);
    return choice[option];
  };
  const date = () => {
    const year = Math.floor(Math.random() * (2019 - 2011) + 2011);
    const month = Math.floor(Math.random() * 12 + 1);
    const day = Math.floor(Math.random() * 30 + 1);
    const newDate = new Date(year, month, day);
    return newDate.getTime();
  };
  while (array.length < 15) {
    array.push({
      id: uuid.v4(),
      type: t(),
      amount: Math.floor(Math.random() * 10000),
      date: date(),
    });
  }
};

fill(transactionHistory);

const newArr = transactionHistory
  .sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    }
    if (b.date > a.date) {
      return -1;
    }
    return 0;
  })
  .map(item => ({ ...item, date: new Date(item.date).toLocaleString() }));

const ttt = JSON.stringify(newArr);
console.log(ttt);

export default newArr;
