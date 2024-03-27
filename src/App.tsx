import { useState } from "react";
import "./App.scss";
import Button from "./components/Button/Button";
import ProfileContainer from "./components/ProfileContainer/ProfileContainer";
import { User, UserResult } from "./types/User";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const url = "https://randomuser.me/api?results=5";
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
