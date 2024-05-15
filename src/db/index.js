import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("sessions");

//sqlite 13
export const init = () => {
  console.log("creating table");
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      console.log("entro al tarnsaction");
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);",
        [],
        (_, result) => resolve(result),
        (_, result) => reject(error)
      );
    });
  });
  console.log("return promise");
  return promise;
};

export const insertSession = ({ localId, email, token }) => {
  const promise = new Promise((resolve, reject) => {

      db.transaction((tx) => {
        console.log("insert Entro");
      tx.executeSql(
        "INSERT INTO sessions(localId,email,token) VALUES(?,?,?);",
        [email, localId, token],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};
