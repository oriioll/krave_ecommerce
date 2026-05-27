/**
 * Generates a success feedback response object
 * @param {string} op - The operation performed (e.g., 'created', 'updated', 'deleted')
 * @returns {Object} Feedback object with message and success status
 */
export const getFeedback = (op) => {
  return {
    message: "Product " + op + " successfully",
    status: "success",
  };
};

/**
 * Generates an error response object
 * @param {string} log - The error log message
 * @param {string} op - The operation that failed
 * @param {string} data - The data involved in the failed operation
 * @returns {Object} Error object with error details and status code
 */
export const getError = (log, op, data) => {
  return {
    error: true,
    message: `Cannot ${op} ${data}`,
    log: log,
    status: "error",
    code: 500,
  };
};

/**
 * Validates if a product object has all required properties and correct types
 * @param {Object} p - The product object to validate
 * @returns {boolean} True if the product is valid, false otherwise
 */
export const validateProduct = (p) => {
  if (
    p.name === undefined ||
    p.description === undefined ||
    p.price === undefined ||
    p.main_image === undefined ||
    p.hover_image === undefined ||
    p.about_image === undefined ||
    p.info_image === undefined ||
    p.weight === undefined ||
    p.slug === undefined
  ) {
    return false;
  }
  if (
    typeof p.name !== "string" ||
    typeof p.description !== "string" ||
    typeof p.main_image !== "string" ||
    typeof p.hover_image !== "string"
  ) {
    return false;
  }
  if (
    typeof p.price !== "number" ||
    p.price <= 0 ||
    typeof p.weight !== "number"
  ) {
    return false;
  }
  return true;
};
