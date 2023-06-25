import {doc, getDoc} from 'firebase/firestore'
import { auth } from './main';
import { db } from './main';
const user = auth.currentUser.uid;
let role;
const getRole = async () => {
    let snapshot = await getDoc(doc(db, 'users', user));
    if (snapshot.data().role != 'admin') {
        return false   
    } else {
        return true, snapshot.data().role
    }
}
export {getRole}
export {role}