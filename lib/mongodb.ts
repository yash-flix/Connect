import { MongoClient, type Db } from "mongodb";

/**
 * Server-only MongoDB helper. Import it from Route Handlers or other server
 * code, never from a client component.
 *
 * The client promise is cached on globalThis so dev hot reloads and warm
 * serverless invocations reuse one connection pool instead of opening a new
 * one per request.
 */
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    // Thrown only when the database is actually used, so `next build`
    // succeeds without the variable.
    throw new Error(
      "MONGODB_URI is not set. Add it to .env.local (local) or the Vercel project's environment variables.",
    );
  }

  if (!globalForMongo._mongoClientPromise) {
    const promise = new MongoClient(uri).connect();
    // Forget a failed connection so the next request retries.
    promise.catch(() => {
      if (globalForMongo._mongoClientPromise === promise) {
        globalForMongo._mongoClientPromise = undefined;
      }
    });
    globalForMongo._mongoClientPromise = promise;
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db(process.env.MONGODB_DB || "connect");
}
