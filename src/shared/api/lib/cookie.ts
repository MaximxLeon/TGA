export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
}

export function getCookie(name: string) {
  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : undefined;
}

export function removeCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}
