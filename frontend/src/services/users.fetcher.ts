const BASE_API_URL = import.meta.env.VITE_API_URL;
import type { User } from "@/types/User.ts";

/**
 * Gets all the users (admin only)
 * @returns All the users returned
 * @author Oriol Plazas León
 * @since 17/06/2026
 */
export const getUsers = async () => {
  const url = BASE_API_URL + "/admin/users";
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error("Error fetching users");
  return await response.json();
};

/**
 * Gets the user with the id in parameter (admin only)
 * @param id The id of the user to get
 * @returns The user with that id
 * @author Oriol Plazas León
 * @since 17/06/2026
 */
export const getUserById = async (id: number) => {
  const url = BASE_API_URL + "/admin/users/" + id;
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error("Error fetching user with id: " + id);
  return await response.json();
};

/**
 * Posts a user to the api (admin only)
 * @param user The user to post
 * @returns Feedback object from the api
 * @author Oriol Plazas León
 * @since 17/06/2026
 */
export const postUser = async (user: User) => {
  const url = BASE_API_URL + "/admin/users";
  const response = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(user),
  });
  return await response.json();
};

/**
 * Updates the user with the id in parameter (admin only)
 * @param id The id of the user to update
 * @param user The user data to update (password is not sent for security)
 * @returns Feedback object from the api
 * @author Oriol Plazas León
 * @since 17/06/2026
 */
export const putUserById = async (id: number, user: User) => {
  const url = BASE_API_URL + "/admin/users/" + id;
  // Create a copy of user without password for the update
  const { pwd, ...userWithoutPassword } = user;
  const response = await fetch(url, {
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userWithoutPassword),
  });
  return await response.json();
};

/**
 * Deletes the user with the id in parameter (admin only)
 * @param id The id of the user to delete
 * @returns Feedback object from the api
 * @author Oriol Plazas León
 * @since 17/06/2026
 */
export const deleteUserById = async (id: number) => {
  const url = BASE_API_URL + "/admin/users/" + id;
  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
  return await response.json();
};
