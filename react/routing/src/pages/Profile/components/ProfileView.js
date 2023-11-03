import image from "../../../assets/images/person.jpg";

export default function ProfileView() {
    return (
        <div className="flex-fill">
            <h2>Profile View</h2>
            <div className="mb10">
                <h3>Blog n°1</h3>
                <img style={{width: "600px"}} src={image} alt="personne"></img>
            </div>
            <div className="mb10">
                <h3>Blog n°2</h3>
                <img style={{width: "600px"}} src={image} alt="personne"></img>
            </div>
            <div className="mb10">
                <h3>Blog n°3</h3>
                <img style={{width: "600px"}} src={image} alt="personne"></img>
            </div>
            <div className="mb10">
                <h3>Blog n°4</h3>
                <img style={{width: "600px"}} src={image} alt="personne"></img>
            </div>
            <div className="mb10">
                <h3>Blog n°5</h3>
                <img style={{width: "600px"}} src={image} alt="personne"></img>
            </div>
            <div className="mb10">
                <h3>Blog n°6</h3>
                <img style={{width: "600px"}} src={image} alt="personne"></img>
            </div>
        </div>

    )
}