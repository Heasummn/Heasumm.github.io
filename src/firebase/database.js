import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings)

export const Timestamp = firebase.firestore.Timestamp;
export default db;