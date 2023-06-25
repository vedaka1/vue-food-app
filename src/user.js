import {doc, getDoc} from 'firebase/firestore'
import { db } from './main';
let role;
const getRole = async (user) => {
    let snapshot = await getDoc(doc(db, 'users', user));
    if (snapshot.data().role != 'admin') {
        return false   
    } else {
        return true, snapshot.data().role
    }
}
export {getRole}
export {role}