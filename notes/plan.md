# post-challenge

Demonstrate the problem with calling our `getUsers()` in `App` (outside of a useEffect()).
The state changes will cause a infinite loop.

We want to get multiple users on page load / Mounting using useEffect().

In App.tsx:

- Import the useEffect hook from react.
- Demonstrate the useEffect hook will trigger only once with a empty dependency array.
- This way we can get `getUsers()` to be called once.
- Demonstrate if the dependency array is removed you will enter another infinite loop.

```tsx
// App.tsx

import { useEffect, useState } from "react";
import "./App.scss";
import ProfileContainer from "./components/ProfileContainer/ProfileContainer";

const App = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const url = "https://randomuser.me/api?results=5";
    const res = await fetch(url);
    const data = await res.json();
    setUsers(data.results);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="app">
      <h1>Random User Generator</h1>
      <ProfileContainer profiles={users} />
    </div>
  );
};

export default App;
```

Next look how how you can get `useEffect()` to trigger when something updates.

For this you will use the `<RangeInput/>` component, when the user changes the slider that amount of users will be requested.

In App.tsx:

- Initialize some new state, this will be how we store the number of users we want to see.
  - `const [numberOfUsers, setNumberOfUsers] = useState<number>(7);`
- Update the `getUsers()` function to accept a parameter this will be the `resultNumber` (number), the amount of random users we want to display. We give it as a parameter because if we used the `numberOfUsers` state inside the function, the function would become a dependency as it would be changing whenever the state did.
  - Use this parameter to update the url to add the query param onto the end `?results=${resultNumber}`.
  - In the useEffect() where we call the function add the `numberOfUsers` state as the argument.

```tsx
const [numberOfUsers, setNumberOfUsers] = useState<number>(7);

const getUsers = async (resultNumber: number) => {
  const url = `https://randomuser.me/api?results=${resultNumber}`;
  const res = await fetch(url);
  const data: UserResult = await res.json();
  setUsers(data.results);
};

useEffect(() => {
  getUsers(numberOfUsers);
}, [numberOfUsers]);
```

- Talk through the `<RangeInput/>` component, talk through its props.
- Import it into app and give it the props it needs.

```tsx
<RangeInput
  id="user-range"
  label={`Number of users: ${numberOfUsers}`}
  min={1}
  max={10}
  value={numberOfUsers}
  onChange={handleInputChange}
/>
```

- Write a function to handle the input change and update the state.
- The event for the `onChange` function prop should be `ChangeEvent<HTMLInputElement>` so it's compatible with `ChangeEventHandler<HTMLInputElement>`
  - As the value is a string we need to parse it as an int before we update our state.

```tsx
const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  const userInput = parseInt(event.currentTarget.value);
  setNumberOfUsers(userInput);
};
```

- The last step is to add the `numberOfUsers` to the dependency array.

The Completed App is below.

```tsx
// App.tsx

import { ChangeEvent, useEffect, useState } from "react";
import "./App.scss";
import ProfileContainer from "./components/ProfileContainer/ProfileContainer";
import RangeInput from "./components/RangeInput/RangeInput";
import { User, UserResult } from "./types/User";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [numberOfUsers, setNumberOfUsers] = useState<number>(7);

  const getUsers = async (resultNumber: number) => {
    const url = `https://randomuser.me/api?results=${resultNumber}`;
    const res = await fetch(url);
    const data: UserResult = await res.json();
    setUsers(data.results);
  };

  useEffect(() => {
    getUsers(numberOfUsers);
  }, [numberOfUsers]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userInput = parseInt(event.currentTarget.value);
    setNumberOfUsers(userInput);
  };

  return (
    <div className="app">
      <h1>Random User Generator</h1>
      <RangeInput
        id="user-range"
        label={`Number of users: ${numberOfUsers}`}
        min={1}
        max={10}
        value={numberOfUsers}
        onChange={handleInputChange}
      />
      <ProfileContainer profiles={users} />
    </div>
  );
};

export default App;
```

---

### Move onto Challenges

- [Challenge](./challenge/challenge.md)
- [Solution](./challenge/solution.md)
