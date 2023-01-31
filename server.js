require("dotenv").config();

const { createApp } = require("./app");
const { appDataSource } = require("./api/models/appDataSource");

const start = async () => {
  try {
    const app = createApp();
    const PORT = process.env.PORT;

    await appDataSource
      .initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((err) => {
        console.error("Error occurred during Data Source initialization", err);
      });

    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    appDataSource.destroy();
    console.error(err);
  }
};

start();
