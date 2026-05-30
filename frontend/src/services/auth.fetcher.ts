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
  return data;
};

/**
 * Logs in a user using the API
 * @param email The email of the user
 * @param password The password of the user
 * @returns An object with the status and the token
 * @throws {Error} If api fetch fails or responds with an error
 * @author Oriol Plazas León
 * @since 27/05/2026
 */
export const loginUser = async (email: string, password: string) => {
  const url: string = BASE_API_URL + "/login";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, pwd: password }),
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

/**
 * Checks if a user is currently logged or not based on token server cookie
 * @returns An object with the status and the user information if is logged in
 * @throws {Error} If api fetch fails or responds with an error
 * @author Oriol Plazas León
 * @since 27/05/2026
 */
export const userIsLogged = async () => {
  const url: string = BASE_API_URL + "/auth/me";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};
