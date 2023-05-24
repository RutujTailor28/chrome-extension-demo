export const generateKey = () => {
  const secret = Math.random().toString(36).substring(2, 12);
  return secret;
}