// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Advertise = () => {
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/tickets/approved', { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
//       .then(res => setTickets(res.data));
//   }, []);

//   const handleToggleAdvertise = (id, isAdvertised) => {
//     axios.patch(`http://localhost:5000/api/tickets/${id}/advertise`, { isAdvertised: !isAdvertised }, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
//       .then(() => {
//         setTickets(tickets.map(t => t._id === id ? { ...t, isAdvertised: !isAdvertised } : t));
//       })
//       .catch(err => toast.error('Max 6 advertised tickets'));
//   };

//   return (
//     <div className="container mx-auto my-16">
//       <h1 className="text-3xl font-bold mb-8">Advertise Tickets</h1>
//       <table className="table w-full">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Price</th>
//             <th>Advertise</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tickets.map(ticket => (
//             <tr key={ticket._id}>
//               <td>{ticket.title}</td>
//               <td>${ticket.price}</td>
//               <td>
//                 <input type="checkbox" checked={ticket.isAdvertised} className="toggle" onChange={() => handleToggleAdvertise(ticket._id, ticket.isAdvertised)} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Advertise;


const Advertise = () => {
  return (
    <div className="p-10 text-3xl font-bold">
      Advertise Page (Coming Soon)
    </div>
  );
};

export default Advertise;
