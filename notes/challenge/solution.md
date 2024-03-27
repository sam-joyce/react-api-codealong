### Challenge Solution

Create a `<ProfileContainer/>` component, import it into the app and use it in the return statement.

Give the users state to the `<ProfileContainer/>` as props.

```tsx
// App.tsx

import { useState } from "react";
import "./App.scss";
import Button from "./components/Button/Button";
import ProfileContainer from "./components/ProfileContainer/ProfileContainer";
import { User, UserResult } from "./types/User";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const url = `https://randomuser.me/api?results=5`;
    const res = await fetch(url);
    const data: UserResult = await res.json();
    setUsers(data.results);
  };

  return (
    <div className="app">
      <h1>Random User Generator</h1>
      <Button onClick={getUsers} label="Get Random Users" />
      <ProfileContainer profiles={users} />
    </div>
  );
};

export default App;
```

Inside the `<ProfileContainer/>` component import the `<ProfileCard/>`, use the given data/props and map over it to create `<ProfileCard/>`, give each component the props that it needs from the data.

```tsx
// ProfileContainer.tsx

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
```

Style the `<ProfileContainer/>` so it fits the content.

```scss
// ProfileContainer.scss

.profile-container {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
  justify-items: center;
}
```
