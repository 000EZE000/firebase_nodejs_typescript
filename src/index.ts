import app from "./app";
import { PORT } from "./config/environment";

app.listen(PORT, () => {
  console.log(`listennig on port ${PORT}`);
});
