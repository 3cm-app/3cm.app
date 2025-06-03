import { reactive } from "vue"
import { firebase, db } from "./firebase.js"
import { parseUrl } from "./util.js"

let FieldValue = firebase.firestore.FieldValue
const state = reactive({
  user: null,
  userPermission: null,
  link: [],
  total: 0,
})

const getters = {
  isLogin() {
    return !!state.user
  },
  isAdmin() {
    return state.userPermission && state.userPermission.admin
  },
  isDebug() {
    return state.userPermission && state.userPermission.debug
  },
}

const mutations = {
  setUser(newValue) {
    console.log(newValue)
    state.user = newValue
    if (newValue) {
      db.collection("user-permission")
        .doc(state.user.email)
        .get()
        .then((doc) => {
          if (doc) {
            mutations.setUserPermission(doc.data())
          } else {
            mutations.setUserPermission({ admin: false })
          }
        })
    }
  },
  setUserPermission(newValue) {
    state.userPermission = newValue
  },
}

const actions = {
  async getTotal() {
    const snap = await db.collection("stat").doc("link").get()
    state.total = snap.data().total
    return state.total
  },
  async getLinks({
    first, // records index
    rows = 10, // page per rows
  }) {
    if (state.link.length === 0) {
      await actions.fetchLinks({ limit: rows })
    }
    const lastIndex = first + rows - 1
    let limit = 0
    if (lastIndex >= state.link.length && lastIndex >= state.total) {
      limit = lastIndex + 1 - state.link.length
      await actions.fetchLinks({ limit })
    }
    return state.link.slice(first, first + rows).map((doc) => {
      let row = doc.data()
      for (let k of ["uploadedAt", "createdAt", "updatedAt"]) {
        row[k] = row[k].toDate()
      }
      return { id: doc.id, ...row }
    })
  },
  async fetchLinks({
    orderBy = "uploadedAt",
    order = "desc",
    limit = 100,
  } = {}) {
    if (state.total !== 0) {
      if (state.link.length >= state.total) {
        return []
      }
      let leftCount = state.total - state.link.length
      if (limit > leftCount) {
        limit = leftCount
      }
    }
    let q = db.collection("link").orderBy(orderBy, order).limit(limit)
    if (state.link.length > 0) {
      q = q.startAfter(state.link[state.link.length - 1])
    }
    const snapshot = await q.get()
    if (snapshot.empty) {
      return []
    }
    state.link.push(...snapshot.docs)
    return state.link
  },
  async addLink({
    uploadedAt,
    description,
    url,
    isVR,
    checkUrlExist,
    findDownloadUrl,
  }) {
    let {
      hostname,
      id,
      docId,
      url: fixedUrl,
      downloadUrl,
    } = await parseUrl(url, {
      checkExist: checkUrlExist,
      findDownloadUrl,
    })
    const docRef = db.collection("link").doc(docId)
    const docSnapshot = await docRef.get()
    const batch = db.batch()
    let now = FieldValue.serverTimestamp()
    let created = false
    const fixedData = {
      hostname,
      uploadedAt: new Date(uploadedAt),
      description,
      isVR,
      downloadUrl,
    }
    if (docSnapshot.exists) {
      batch.update(docRef, {
        ...fixedData,
        updatedAt: now,
      })
    } else {
      batch.set(docRef, {
        ...fixedData,
        id,
        url: fixedUrl,
        createdAt: now,
        updatedAt: now,
      })
      created = true
      batch.update(db.collection("stat").doc("link"), {
        total: FieldValue.increment(1),
      })
      batch.update(db.collection("stat").doc(hostname), {
        total: FieldValue.increment(1),
      })
    }
    await batch.commit()
    const snap = await docRef.get()
    if (created) {
      state.link.unshift(snap)
      state.total++
    } else {
      const i = state.link.findIndex((row) => row.get("url") === fixedUrl)
      state.link.splice(i, 1, snap)
    }
    console.log("addLink", state.link, snap.data())
    return created
  },
  async delLink({ url }) {
    const { hostname, docId, url: fixedUrl } = await parseUrl(url)
    const batch = db.batch()
    const docRef = db.collection("link").doc(docId)
    // https://firebase.google.com/docs/firestore/reference/rest/v1/Precondition
    batch.delete(docRef, { exists: true })
    batch.update(db.collection("stat").doc(hostname), {
      total: FieldValue.increment(-1),
    })
    batch.update(db.collection("stat").doc("link"), {
      total: FieldValue.increment(-1),
    })
    await batch.commit()
    const i = state.link.findIndex((snap) => snap.get("url") === fixedUrl)
    if (i > -1) {
      state.link.splice(i, 1)
    }
    state.total--
  },
}

export { state, getters, mutations, actions }
