import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const fixAmount = amount =>
  amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

const Balance = ({ changeBalance }) => {
  const deposits = changeBalance.Deposit;
  const withdrawals = changeBalance.Withdrawal;
  const { balance } = changeBalance;
  const depositsToFormat = fixAmount(deposits);
  const withdrawalsToFormat = fixAmount(withdrawals);
  const balanceToFormat = fixAmount(balance);
  return (
    <section className={styles.balance}>
      <span className={styles.arrow_increase}>
        {String.fromCharCode(8593)}{' '}
      </span>
      <span className={styles.amount}>{depositsToFormat}$</span>
      <span className={styles.arrow_decrease}>
        {String.fromCharCode(8595)}{' '}
      </span>
      <span className={styles.amount}>{withdrawalsToFormat}$</span>
      <span className={styles.amount}>Balance: {balanceToFormat}$</span>
    </section>
  );
};

Balance.propTypes = {
  changeBalance: PropTypes.shape({
    Deposit: PropTypes.number.isRequired,
    Withdrawal: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
  }).isRequired,
};

export default Balance;
