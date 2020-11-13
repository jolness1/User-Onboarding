import React from 'react'


function User ({ details }) {
    if (!details) {
        return <h3>Digging Through File Cabinets...</h3>
    }
    
    return (
        <div className='user container'>
          <h2>{details.name}</h2>
          <p>Username:{details.username}</p>
          <p>Email:{details.email }</p>
          <p>Password:{details.password}</p>
      </div>
  )
  
}

export default User

//     <div className='friend container'>
//       <h2>{details.username}</h2>
//       <p>Email: {details.email}</p>
//       <p>Role: {details.role}</p>
//       <p>Civil: {details.civil}</p>

//       {
//         !!details.hobbies && !!details.hobbies.length &&
//         <div>
//           Hobbies:
//           <ul>
//             {details.hobbies.map((like, idx) => <li key={idx}>{like}</li>)}
//           </ul>
//         </div>
//       }
//     </div>
//   )