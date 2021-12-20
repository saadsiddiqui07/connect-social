export const truncateText = (text, n) => {
  return text?.length > n ? text?.substr(0, n - 1) + "..." : text;
};
