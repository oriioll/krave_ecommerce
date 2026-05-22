export const getFeedback = (op) => {
  return {
    message: "Product " + op + " successfully",
    status: "success",
  };
};

export const getError = (log, op, data) => {
  return {
    error: true,
    message: `Cannot ${op} ${data}`,
    log: log,
    status: "error",
    code: 500,
  };
};

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
