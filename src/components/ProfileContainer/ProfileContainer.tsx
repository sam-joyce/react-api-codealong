import { User } from "../../types/User";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./ProfileContainer.scss";

type ProfileContainerProps = {
  profiles: User[];
};

const ProfileContainer = ({ profiles }: ProfileContainerProps) => {
  return (
    <div className="profile-container">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.registered.date.toString()}
          name={`${profile.name.first} ${profile.name.last}`}
          image={profile.picture.large}
          email={profile.email}
          phoneNumber={profile.phone}
        />
      ))}
    </div>
  );
};

export default ProfileContainer;
