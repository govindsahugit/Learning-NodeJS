const accessToken =
  "ya29.a0AZYkNZg4-Art6lGPhvlPrOqpiCv44lfhUvMgwxhIbpk2N4Hr2AEZimU6ClmfsU4pPTUf7le4QgCJF5rh630glo8rwRGzsW7WyTNYjmzFihmoykTyTxWZKQ63_M90C_FkgAJt2wY2F7JPGxz9Ljhzsa-uqhEu6cNJVDuKD9efYAaCgYKAYISARESFQHGX2MiN7qQ2cBtjqOD2h-CiFyJcA0177";

const response = await fetch(
  `https://openidconnect.googleapis.com/v1/userinfo?access_token=${accessToken}`
  // {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // }
);

const userData = await response.json();

console.log(userData);
