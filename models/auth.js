import Cookies from "universal-cookie";

const cookies = new Cookies();

export function checkAuth() {
  const authToken = cookies.get("authToken");
  return authToken !== undefined && authToken !== null;
}
