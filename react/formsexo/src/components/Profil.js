import { useEffect, useState } from "react";

const Profil = ({ auth }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let user = {};
      user.idUser = auth;
      try {
        const response = await fetch("http://localhost:8000/getUserProfil", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.ok) {
          const res = await response.json();
          console.log(res);
          setUserData(res);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={`mh100 d-flex flex-column justify-content-center align-items-center`}
    >
      <h1>profil</h1>
      {userData && (
        <>
          <p>nom : {userData[0].username}</p>
          <p>mail : {userData[0].email}</p>
          <p>techno préféré : {userData[0].techno}</p>
          <h2>Hobbies</h2>
          {userData[0].hobby &&
            userData.map((el, index) => (
              <p key={index}>
                {el.hobby} : {el.level}
              </p>
            ))}
        </>
      )}
    </div>
  );
};

export default Profil;
