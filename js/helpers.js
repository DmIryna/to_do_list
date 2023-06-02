export function setCookie(taskArray) {
  taskArray.forEach((entry) => {
    const key = entry.id
    const value = entry.name
    const expireDate = 60 * 60 * 24 * 7

    return (document.cookie = `${key}=${value}; max-age=${expireDate}`)
  })
}

export function deleteCookie(taskId) {
  const key = taskId
  const value = ""
  const expireDate = new Date(null)

  return (document.cookie = `${key}=${value}; max-age=${expireDate}`)
}

export function getCookie() {
  const cookies = document.cookie
    .split("; ")
    .map((cookie) => cookie.split("="))
    .filter((cookie) => cookie[1] !== "" && cookie[1] !== "undefined")

  const cookieArray = cookies.map((entry) => ({
    id: +entry[0],
    name: entry[1],
  }))

  return cookieArray
}
