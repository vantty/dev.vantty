const mongoose = require('mongoose');

function setupDatabase() {
  async function openConnection(database) {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }

  async function closeConnection() {
    await mongoose.connection.close();
    await mongoose.disconnect();
  }

  async function dropAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      try {
        await collection.drop();
      } catch (error) {
        // Sometimes this error happens, but you can safely ignore it
        if (error.message === 'ns not found') return;
        // This error occurs when you use it.todo. You can
        // safely ignore this error too
        if (
          error.message.includes('a background operation is currently running')
        )
          return;
        console.log(error.message);
      }
    }
  }

  async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany();
    }
  }

  return {
    open: openConnection,
    close: closeConnection,
    dropCollections: dropAllCollections,
    removeCollections: removeAllCollections,
  };
}

module.exports = {
  setupDatabase,
};
