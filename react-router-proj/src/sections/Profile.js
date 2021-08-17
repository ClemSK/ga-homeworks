import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import { Link } from "react-router-dom";

const users = {
  robin: {
    username: "robin",
    displayName: "Robin James Kerrison",
  },
  tristan: {
    username: "tristan",
    displayName: "Tristan Hall",
  },
};

const Profile = ({ username }) => {
  if (!username) {
    return (
      <section className="profile">
        <h2>Profile</h2>
        <p>No user selected</p>
      </section>
    );
  }
  const user = users[username];
  // const { username } = useParams();

  // not sure if the link is needed based on the prop calling the user in ProfileHeader
  return (
    <section className="profile">
      <Link to={`/profile/${Profile.username}}`}> 
        <h2>Profile</h2>
        <ProfileHeader {...user}></ProfileHeader>
      </Link>
    </section>
  );
};

// const Profile = () => {
//   const { username }: { username: string } = useParams;
//   return <div>Stuff: {username}</div>;
// };

export default Profile;
