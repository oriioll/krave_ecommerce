import type { Product } from "@/types/Product";

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

/**
 * Validates if a product has correct values
 * @param product The product to validate
 * @returns {Object} { valid: boolean; error: string } If product is valid or not and message
 * @author Oriol Plazas León
 * @since 03/06/2026
 */
export const validateProduct = (
  product: Product,
): { valid: boolean; error: string } => {
  if (!validateProductName(product.name)) {
    return {
      valid: false,
      error:
        "Product name must be non-empty and contain only valid characters.",
    };
  }
  if (!validateDescription(product.description)) {
    return { valid: false, error: "Description must be a non-empty string." };
  }
  if (!validatePriceOrWeight(product.price)) {
    return { valid: false, error: "Price must be a number greater than 0." };
  }
  if (!validatePriceOrWeight(product.weight)) {
    return { valid: false, error: "Weight must be a number greater than 0." };
  }
  if (!validateSlug(product.slug)) {
    return {
      valid: false,
      error: "Slug is required and must not contain spaces.",
    };
  }
  if (!validateImage(product.main_image, true)) {
    return {
      valid: false,
      error: "Main image is required and must be a valid URL.",
    };
  }
  if (!validateImage(product.hover_image)) {
    return {
      valid: false,
      error: "Hover image must be a valid URL if provided.",
    };
  }
  if (!validateImage(product.about_image)) {
    return {
      valid: false,
      error: "About image must be a valid URL if provided.",
    };
  }
  if (!validateImage(product.info_image)) {
    return {
      valid: false,
      error: "Info image must be a valid URL if provided.",
    };
  }
  return { valid: true, error: "" };
};

export const validateImage = (
  image?: string | null,
  required = false,
): boolean => {
  if (required) {
    return !!image && validateUrl(image);
  }

  if (image === null || image === undefined || image.trim() === "") {
    return true;
  }

  return validateUrl(image);
};

export const validatePriceOrWeight = (value?: number | null): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  return typeof value === "number" && value > 0;
};

export const validateProductName = (name: string): boolean => {
  const regex = /^[a-zA-ZÀ-ÿ0-9\s\-()]+$/;
  return name.trim().length > 0 && regex.test(name);
};

export const validateDescription = (description?: string | null): boolean => {
  if (!description) {
    return true;
  }

  return description.trim().length > 0;
};

export const validateSlug = (slug?: string): boolean => {
  if (!slug) {
    return false;
  }

  return !slug.includes(" ");
};

export const validateUrl = (url: string): boolean => {
  const trimmed = url.trim();
  if (trimmed.startsWith("data:image/")) return true;
  try {
    const parsedUrl = new URL(trimmed);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

export const handleImagesNulls = (product: Product): Product => {
  const normalizedProduct: Product = product;
  if (product.about_image == "") {
    normalizedProduct.about_image = null;
  }
  if (product.hover_image == "") {
    normalizedProduct.hover_image = null;
  }
  if (product.info_image == "") {
    normalizedProduct.info_image = null;
  }
  return normalizedProduct;
};
