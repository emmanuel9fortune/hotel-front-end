export const formatUnix = (unix) =>
  new Date(unix * 1000).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });