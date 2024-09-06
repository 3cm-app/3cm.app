export default function () {
  return {
    view(vnode) {
      return (
        <div class="container mx-auto">
          <div class="h-screen grid content-center">
            {vnode.children}
          </div>
        </div>
      )
    },
  }
}
