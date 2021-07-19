/* eslint-disable no-console */
const mongoose = require('mongoose');
const app = require('./app');

let server;

mongoose.connect(process.env.MONGOOSE_URL, process.env.MONGOOSE_OPTIONS).then(() => {
    console.log('Connected to MongoDB');
    server = app.listen(process.env.MONGOOSE_PORT, () => {
      console.log(`Listening to port ${process.env.MONGOOSE_PORT}`);
    });
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  
const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
  };
  

  process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
