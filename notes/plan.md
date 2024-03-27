# lesson-start

## Introducing the API

Introduce them to the [Random user API](https://randomuser.me/documentation#howto) that you will be using.

On the docs above it gives you the endpoint to send your requests to `https://randomuser.me/api/`.

**This URL will only give you one random user.**

On the docs it shows you how to get multiple users. To do so you add this `results=5` query parameter to the end of the URL.

For now this `https://randomuser.me/api/?results=5` will be the URL we use to fetch random users.

## Getting a Random User

In App.jsx:

- Import the `<Button/>` component
- Write an async `getUser()` function. Talk through `async/await` syntax and for now it can just log a single result to the console.
- Hook up the `getUser()` function to run onClick of the `<Button/>`.
- Show that we get back a complex object with a results array back as our data.
- We have a `UserResult` type that we have created ourselves already that matches the data returned from our fetch request.
  - This gives us type safety when interacting with the API.
  - Feel free to jump into `types/User.ts` to show this.

```tsx
// App.tsx

import "./App.scss";
import Button from "./components/Button/Button";
import { UserResult } from "./types/User";

const App = () => {
  const getUser = async () => {
    const url = `https://randomuser.me/api`;
    const res = await fetch(url);
    const data: UserResult = await res.json();
    console.log(data);
  };

  return (
    <div className="app">
      <h1>Random User Generator</h1>
      <Button onClick={getUser} label="Get Random User" />
    </div>
  );
};

export default App;
```

- If students are not so familiar with async/ await, you can compare what the same function would look like with `.then()`

```js
const getUser = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data.results[0]));
};
```

- Bring in the `useState()` hook so you can get the component to rerender once you have the response from the API.
- Import and use the `User` type for this state.
- Set the first user from the API to state instead of logging it.

```tsx
const [user, setUser] = useState<User>();

const getUser = async () => {
  const url = `https://randomuser.me/api`;
  const res = await fetch(url);
  const data: UserResult = await res.json();
  setUser(data.results[0]);
};
```

- Import the `<ProfileCard/>` into the App.jsx and hook it up to render when you have a user and give it the props it needs.
- Explain that you will only display the `<ProfileCard/>` when you have a user stored in state so need to check that before trying to display it.

```tsx
return (
  <div className="app">
    <h1>Random User Generator</h1>
    <Button onClick={getUser} label="Get Random User" />
    {user && (
      <ProfileCard
        name={`${user.name.first} ${user.name.last}`}
        image={user.picture.large}
        email={user.email}
        phoneNumber={user.phone}
      />
    )}
  </div>
);
```

## Multiple Users

- Great, time to update it so you set the results array to state rather then a single user in `getUser()`.
  - `setUsers(data.results);`
  - This will break your code so either comment it out or add `user[0]` to where you give the `<ProfileCard/>` its props.
- Use an array of users as the type for the state now: `User[]`
- The Completed App is below, afterwards move onto the challenge.

```tsx
// App.tsx

import { useState } from "react";
import "./App.scss";
import Button from "./components/Button/Button";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import { User, UserResult } from "./types/User";

const App = () => {
  const [users, setUsers] = useState<User[]>();

  const getUsers = async () => {
    const url = `https://randomuser.me/api`;
    const res = await fetch(url);
    const data: UserResult = await res.json();
    setUsers(data.results);
  };

  return (
    <div className="app">
      <h1>Random User Generator</h1>
      <Button onClick={getUsers} label="Get Random User" />
      {users && (
        <ProfileCard
          name={`${users[0].name.first} ${users[0].name.last}`}
          image={users[0].picture.large}
          email={users[0].email}
          phoneNumber={users[0].phone}
        />
      )}
    </div>
  );
};

export default App;
```

---

### Move onto Challenges

- [Challenge](./challenge/challenge.md)
- [Solution](./challenge/solution.md)
