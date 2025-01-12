import app from "./app.js";
import 'dotenv/config'
import connectDatabase from "./config/db.js";

const PORT = process.env.PORT || 4444

app.listen(PORT, () => {
  connectDatabase(); // Connect to MongoDB before starting the server
  console.log(`Server running on port ${PORT}`);
});
