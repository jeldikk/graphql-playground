import app from "./app";
import { env } from "./env";
import { dbConnect } from "./database/connect";
import { startApolloServer } from "./apollo/apollo.server";

async function startServer() {
  try {
    await dbConnect();
    await startApolloServer(app);
    console.log("Apollo Server started");
    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
  }
}

startServer().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
