const { MongoClient, ObjectID } = require("mongodb");
const id = new ObjectID();
console.log(id.id.length);
console.log(id.toHexString());

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "Task-manager";
MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, client) => {
    if (error) {
      return console.log("unable to connect to database");
    }
    const db = client.db(databaseName);

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("5f0496539988c742ccd45557"),
    //     },
    //     {
    //       $inc: {
    //         age: 5,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // db.collection("Tasks")
    //   .updateMany(
    //     { completed: true },
    //     {
    //       $set: {
    //         completed: false,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result.modifiedCount);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    db.collection("users")
      .deleteMany({ name: "jennifer" })
      .then((result) => {
        console.log(result.deleteCount);
      })
      .catch((error) => {
        console.log(error);
      });
    db.collection("users")
      .deleteOne({
        _id: new ObjectID("5f0499f05ab7d341741d3260"),
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
