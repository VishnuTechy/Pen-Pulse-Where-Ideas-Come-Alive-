import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || ''
('MONGO_URI:', MONGO_URI)
if (!global._mongoose) {
  global._mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (global._mongoose.conn) return global._mongoose.conn
  if (!global._mongoose.promise) {
    global._mongoose.promise = mongoose.connect(MONGO_URI, { dbName: 'blog-app' }).then(m => m)
  }
  global._mongoose.conn = await global._mongoose.promise
  return global._mongoose.conn
}
