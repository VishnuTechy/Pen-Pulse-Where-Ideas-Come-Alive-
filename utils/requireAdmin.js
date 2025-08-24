export function requireAdmin(handler) {
  return async (req, res, user) => {
    if (user?.role !== "admin") {
      return new Response(JSON.stringify({ message: "Admin access required" }), { status: 403 })
    }
    return handler(req, res, user)
  }
}
