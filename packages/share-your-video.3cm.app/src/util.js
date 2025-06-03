function formatDate(value) {
  return value.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}
function dateStringToDate(s /** mm/dd/yyyy */) {
  let [mm, dd, yyyy] = s.split("/")
  return new Date(yyyy, parseInt(mm) - 1, dd)
}
async function parseUrl(
  raw = "",
  { checkExist = false, findDownloadUrl = false } = {}
) {
  // try to fix url
  raw = raw.trim()
  let url = raw
  if (!raw.startsWith("http:") && !raw.startsWith("https:")) {
    if (raw.startsWith("//")) {
      url = "https:" + raw
    } else if (raw.startsWith("/")) {
      url = "https:/" + raw
    } else {
      url = "https://" + raw
    }
  }
  let { hostname, pathname, searchParams } = new URL(url)
  let id = ""
  let collection = ""
  let filename = ""
  let downloadUrl = ""
  switch (hostname) {
    case "gopro.com":
      // /v/xxxxx => xxxxx
      collection = hostname
      id = pathname.substring(3)
      if (checkExist) {
        let res = await fetch(url, {
          method: "HEAD",
          // mode: 'no-cors', // this won't work, because the resp will be opaque, e.q. res.status === 0
        })
        if (res.status !== 200) {
          // 302 or something means it will redirect to 404 page
          throw new Error(`Url not found (${url})`)
        }
        if (findDownloadUrl) {
          let res = await fetch(`https://api.gopro.com/media/${id}/download`, {
            method: "GET",
          }).json()
          console.log(res)
          let json = res.json()
          filename = json.filename
          if (
            json._embedded &&
            json._embedded.files &&
            json._embedded.files[0] &&
            typeof json._embedded.files[0] === "object"
          ) {
            downloadUrl = json._embedded.files[0].url
          }
        }
      }
      break
    case "youtu.be":
      // https://youtu.be/wclmDuob8x4
      collection = "youtube.com"
      id = pathname.substring(1)
      break
    case "youtube.com":
    case "www.youtube.com":
      // https://www.youtube.com/watch?v=wclmDuob8x4
      collection = "youtube.com"
      id = searchParams.get("v")
      break
    default:
      throw new Error("Not supported url")
  }
  if (!id || id === "") {
    throw new Error("Parsing URL to id failed")
  }
  return {
    url,
    id,
    docId: collection + "#" + id,
    hostname: collection,
    filename,
    downloadUrl,
  }
}

export { formatDate, dateStringToDate, parseUrl }
