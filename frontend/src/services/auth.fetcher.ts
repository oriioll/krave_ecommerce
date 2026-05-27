const BASE_API_URL = import.meta.env.VITE_API_URL;

/**
 * Registers a new user account into db using the API
 * @param email The email of the user
 * @param password The password of the user
 * @param name The name of the user
 * @returns An object with the status and the token
 * @throws {Error} If api fetch fails or responds with an error
 * @author Oriol Plazas León
 * @since 27/05/2026
 */
export const registerUser = async (
  email: string,
  password: string,
  name: string,
) => {
  const url: string = BASE_API_URL + "/register";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, pwd: password, name: name }),
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error("Cannot register user: " + data.message);
  }
  return data;
};
