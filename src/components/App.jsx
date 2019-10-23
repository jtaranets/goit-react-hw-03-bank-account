import React, { Component } from 'react';
import uuid from 'uuid';
import Controls from './controls/Controls';
import Balance from './balance/Balance';
import TransactionHistory from './transactionHistory/TransactionHistory';
import styles from './App.module.css';

class Dashboard extends Component {
  state = {
    transaction: [],
  };

  handleClick = amount => {
    const newOperation = { ...amount, id: uuid.v4() };
    this.setState(state => ({
      transaction: [...state.transaction, newOperation],
    }));
  };

  componentDidMount() {
    const res = localStorage.getItem('transactions');
    if (res) {
      this.setState({ transaction: JSON.parse(res) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.transaction !== prevState.transaction) {
      localStorage.setItem(
        'transactions',
        JSON.stringify(this.state.transaction),
      );
    }
  }

  getValues = transaction => {
    const values = transaction.reduce(
      (acc, item) =>
        acc[item.type]
          ? { ...acc, [item.type]: (acc[item.type] += item.amount) }
          : { ...acc, [item.type]: item.amount },
      { Deposit: 0, Withdrawal: 0 },
    );
    values.balance = values.Deposit - values.Withdrawal;
    return values;
  };

  render() {
    const { transaction } = this.state;
    const balance = this.getValues(transaction);
    return (
      <div className={styles.dashboard}>
        <Controls addOperation={this.handleClick} balance={balance.balance} />
        <Balance changeBalance={balance} />
        <TransactionHistory transactions={transaction} />
      </div>
    );
  }
}

export default Dashboard;
