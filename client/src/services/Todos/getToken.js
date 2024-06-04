export const getToken = () => {
  let user = localStorage.getItem("user");
  if (!user) return;
  const userObj = JSON.parse(user);

  return userObj.token;
};
