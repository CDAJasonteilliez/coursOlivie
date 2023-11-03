import image from "../../../assets/images/lions.jpg";
import { NavLink } from "react-router-dom";

export default function ProfileData() {
    return (
        <div className="flex-fill">
            <h2>Profile Data</h2>
            <div className="mb10">
                <h3>Blog n°1</h3>
                <img style={{width: "600px"}} src={image} alt="animal"></img>
            </div>
            <div className="mb10">
                <h3>Blog n°2</h3>
                <img style={{width: "600px"}} src={image} alt="animal"></img>
            </div>
            <div className="mb10">
                <h3>Blog n°3</h3>
                <img style={{width: "600px"}} src={image} alt="animal"></img>
            </div>
            <div className="mb10">
                <h3>Blog n°4</h3>
                <img style={{width: "600px"}} src={image} alt="animal"></img>
            </div>
            <NavLink to=".." >return to view</NavLink>
            {/* pour ne pas reset le scroll */}
            {/* <NavLink preventScrollReset to=".." >return to view</NavLink> */}
            <div className="mb10">
                <h3>Blog n°5</h3>
                <img style={{width: "600px"}} src={image} alt="animal"></img>
            </div>
            <div className="mb10">
                <h3>Blog n°6</h3>
                <img style={{width: "600px"}} src={image} alt="animal"></img>
            </div>
        </div>
    )
}