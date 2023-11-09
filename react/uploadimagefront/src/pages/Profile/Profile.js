import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"
import image from '../../assets/images/avatar.png';


export default function Profile() {
  const [user, setUser] = useOutletContext();
  const [userLogged, setUserLogged] = useState();
  console.log(user);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:8000/getUser/${user}`);
      if (response.ok) {
        const userConnected = await response.json();
        console.log(userConnected);
        setUserLogged(userConnected);
      }
    }
    getUser();
  }, [user]);

  return (
    <div className="flex-fill">
      <h1>Profil</h1>
      {userLogged && userLogged.avatar ? (
        <div className="flex-fill">
          <img src = {`http://localhost:8000/${userLogged.avatar}`} alt="avatar" />
        </div>
      ) :(
        <div className="flex-fill">
        <img src = {image} alt="avatar" />
      </div>
      )}
    </div>
  )
}
