## Solution

On the docs it shows you that you can specify the gender by adding a query param to the end of the url.

So if we want to request a certain gender we can add `?gender=female` or `?gender=male` to the end or our URL.

If we do not add it we get both genders.

Import the `<RadioButtons/>` component into App.tsx. We can use this to pass the selected gender back to the App.

The component takes a couple of props:

- onChange: A function to handle when a user selects one of the options.
- options: An array of strings. These are the different values and labels for the buttons.
- selected: The string name of the currently selected option
- label: a text description of the overall radio button group

Import the component into App.tsx and add it to the return statement. Give it the props it needs.

```tsx
// App.tsx
<RadioButtons
  onChange={handleChange}
  selected={gender}
  options={["all", "female", "male"]}
  label="Select User Gender:"
/>
```

We need to hook these pieces together. In App.tsx create some new state `const [gender, setGender] = useState<Gender>("all");` this will be how we store the value from the radio buttons.

You will need to import the `Gender` type from `User.ts`

We need a way to update the new state when a radio button is selected. Create a function that gets the value from the event and updates the state.

You will need to use the `ChangeEvent<HTMLInputElement>` as the type of your event parameter to match the onChange type of `RadioButtons`

```tsx
const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  const userInput = event.currentTarget.value;

  if (userInput !== "all" && userInput !== "female" && userInput !== "male") {
    return;
  }

  setGender(userInput);
};
```

Make sure this function is given to the `<RadioButtons/>` component as props.

The `getUsers()` function needs to be updated.
It will take another parameter which will be the gender.
We can still add the result query param to the end.
If the gender is not all we can add on the gender query param we want to request.

```tsx
// App.tsx
const getUsers = async (resultNumber: number, genderFilter: Gender) => {
  const url = "https://randomuser.me/api";
  let urlWithParams = url + `?results=${resultNumber}`;

  if (genderFilter !== "all") {
    urlWithParams += `&gender=${genderFilter}`;
  }

  const res = await fetch(urlWithParams);
  const data: UserResult = await res.json();

  setUsers(data.results);
};
```

Finally we can update our `useEffect`, we want to add the new state as an argument to the `getUsers()` function.
We can then update our dependency array so it calls the function when the state changes.

```tsx
// App.tsx
useEffect(() => {
  getUsers(numberOfUsers, gender);
}, [numberOfUsers, gender]);
```
