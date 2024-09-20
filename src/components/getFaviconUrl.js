export const getFaviconUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.origin}/favicon.ico`;
  } catch (error) {
    console.error("Invalid URL", error);
    return "/path/to/default-icon.png";
  }
};
