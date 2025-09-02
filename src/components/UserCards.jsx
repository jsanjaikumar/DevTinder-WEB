import React from 'react'

const UserCards = ({ user }) => {
  console.log(user);
  const { firstName, lastName, age, about, photoUrl, skills, gender } = user;


  return (
    <>
    <div className="flex justify-center items-center h-screen mb-5">
      <div className="card bg-base-300 w-96 max-h-[90vh] shadow-sm overflow-y-auto">
        <figure>
          <img src={photoUrl} alt="user Image" className="h-60 w-full object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          {skills && <p>{skills}</p>}

          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary mx-4">Ignore</button>
            <button className="btn btn-secondary mx-4">Interested</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
  


export default UserCards