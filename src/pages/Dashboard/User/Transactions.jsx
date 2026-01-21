import { useEffect, useState } from 'react';
import axios from 'axios';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/transactions', { headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` } })
      .then(res => setTransactions(res.data));
  }, []);

  return (
    <div className="container mx-auto my-16">
      <h1 className="text-3xl font-bold mb-8">Transaction History</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Ticket Title</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(trans => (
            <tr key={trans._id}>
              <td>{trans.transactionId}</td>
              <td>${trans.amount}</td>
              <td>{trans.ticketTitle}</td>
              <td>{new Date(trans.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;