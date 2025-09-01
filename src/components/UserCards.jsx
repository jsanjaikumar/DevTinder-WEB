import React from 'react'

const UserCards = ({ user }) => {
console.log(user);
const { firstName, lastName, age, about, photoUrl, skills, gender } = user
    

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        {age && gender && <p>{age + " " + gender}</p>}
        <div className="card-actions justify-center my-4 ">
          <button className="btn btn-primary mx-4">Ignore</button>
          <button className="btn btn-secondary mx-4">Interested</button>
        </div>
      </div>
    </div>
  );
}

export default UserCards