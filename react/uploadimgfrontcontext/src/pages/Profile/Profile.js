import image from '../../assets/images/avatar.png';
import { UserContext } from "../../context";
import { useContext } from 'react';


export default function Profile() {
  const { user } = useContext(UserContext)

  return (
    <div className="flex-fill">
      <h1>Profil</h1>
      {user && user.avatar ? (
        <div className="flex-fill">
          <img src = {`http://localhost:8000/${user.avatar}`} alt="avatar" />
        </div>
      ) :(
        <div className="flex-fill">
        <img src = {image} alt="avatar" />
      </div>
      )}
    </div>
  )
}
