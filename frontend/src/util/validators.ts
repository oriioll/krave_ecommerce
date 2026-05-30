/**
 * Validates if an email is valid or not based on regex
 * @param {string} email The email to test
 * @returns {boolean} If email is valid or not
 * @author Oriol Plazas León
 * @since 30/05/2026
 */
export const validateEmail = (email: string): boolean => {
  const trimmed = email.trim();
  //email format
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(trimmed);
};

/**
 * Validates if a password matches security requirements
 * @param {string} pwd The password to test
 * @returns {boolean} If password is valid or not
 * @author Oriol Plazas León
 * @since 30/05/2026
 */
export const validatePassword = (pwd: string): boolean => {
  const trimmed = pwd.trim();
  // At least 8 chars, one letter, one number
  const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return regex.test(trimmed);
};

/**
 * Validates if a name is valid for display purposes
 * @param {string} name The name to test
 * @returns {boolean} If name is valid or not
 * @author Oriol Plazas León
 * @since 30/05/2026
 */
export const validateName = (name: string): boolean => {
  const trimmed = name.trim();
  // Must contain only letters and spaces, at least one letter
  const regex = /^[A-Za-zÀ-ÿ\s]+$/;
  return trimmed.length > 0 && regex.test(trimmed);
};
