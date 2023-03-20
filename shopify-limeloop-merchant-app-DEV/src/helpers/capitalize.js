export function capitalizeString(string_to_capitalize) {
  if (typeof string_to_capitalize !== "string") return "";
  return string_to_capitalize.charAt(0).toUpperCase() + string_to_capitalize.slice(1);
}
