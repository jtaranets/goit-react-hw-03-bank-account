import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionHistory.module.css';

const TransactionHistory = ({ transactions }) => {
  const amountToFormat = amount =>
    amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  return (
    transactions.length > 0 && (
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableTitle}>Transaction</th>
            <th className={styles.tableTitle}>Amount</th>
            <th className={styles.tableTitle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .map(item => (
              <tr key={item.id}>
                <td className={styles.data}>{item.type}</td>
                <td className={styles.data}>{amountToFormat(item.amount)}$</td>
                <td className={styles.data}>{item.date}</td>
              </tr>
            ))
            .reverse()}
        </tbody>
      </table>
    )
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TransactionHistory;
