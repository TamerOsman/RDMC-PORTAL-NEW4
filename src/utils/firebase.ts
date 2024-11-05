/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithCustomToken, signOut } from 'firebase/auth'
import { equalTo, ref as fbRef, getDatabase, onValue, orderByChild, push, query, remove, set, update } from 'firebase/database'
import { deleteObject, getStorage, ref as storageRef } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// import { getCookie, setCookie } from '@/utils/cookies'
interface FbUser {
    user: {
        uid: string | boolean
    }
}
const firebaseConfig = {
    apiKey: 'AIzaSyAd99Q9A1YuJuyUlZaE0PBfgARqhriJ778',
    authDomain: 'rdmc-portal.firebaseapp.com',
    databaseURL: 'https://rdmc-portal-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'rdmc-portal',
    storageBucket: 'rdmc-portal.appspot.com',
    messagingSenderId: '107166091880',
    appId: '1:107166091880:web:474f60764f7b7c70aa89dd',
}
// Await the Firebase sign-in operation
const fbapp = initializeApp(firebaseConfig)
export const storage = getStorage(fbapp)
export const db = getFirestore(fbapp)

export async function checkLogin(customToken: string) {
    try {
        const auth = getAuth(fbapp)
        const user: FbUser = await signInWithCustomToken(auth, customToken)
        // console.log('fb user 2', user)
        return user
    } catch (error: any) {
        // console.error('Error authenticating with Firebase:', error)
        if (error.message.includes('IndexedDB')) {
            await resetIndexedDB()
        }
        const user: FbUser = { user: { uid: false } }
        return user
    }
}

export function fbOnvalue(collection: string, callback: Function) {
    const db = getDatabase()
    const collectionRef = fbRef(db, collection)
    onValue(collectionRef, snapshot => {
        const data = snapshot.val()
        if (data && typeof data === 'object') {
            const dkeys = Object.keys(data)
            const result = dkeys.map((key: string | number) => {
                return { key, value: data[key] }
            })
            callback(result)
        } else if (data === null) {
            callback(null) // Resolve with an empty array if no data exists
        } else {
            callback(null) // Reject with an error if data is not an object
        }
    })
}
export async function readData(collection: string): Promise<any> {
    const db = getDatabase()
    const collectionRef = fbRef(db, collection)

    return new Promise((resolve, reject) => {
        onValue(collectionRef, snapshot => {
            const data = snapshot.val()

            if (data && typeof data === 'object') {
                const dkeys = Object.keys(data)
                const result = dkeys.map((key: string | number) => {
                    return { key, value: data[key] }
                })
                resolve(result)
            } else if (data === null) {
                resolve([]) // Resolve with an empty array if no data exists
            } else {
                reject(new Error('Data is not an object')) // Reject with an error if data is not an object
            }
        }, error => {
            reject(error) // Handle any database-related errors
        })
    })
}

export async function get(collection: string): Promise<any> {
    const db = getDatabase()
    const collectionRef = fbRef(db, collection)
    return new Promise((resolve, reject) => {
        onValue(collectionRef, snapshot => {
            const data = snapshot.val()
            if (data && typeof data === 'object') {
                resolve(data)
            } else if (data === null) {
                resolve([]) // Resolve with an empty array if no data exists
            } else {
                reject(new Error('Data is not an object')) // Reject with an error if data is not an object
            }
        }, error => {
            reject(error) // Handle any database-related errors
        })
    })
}

function convertSerialDate(serial: any) {
    // Excel dates start on January 1, 1900
    const excelEpoch = new Date(1900, 0, 1)

    // Subtract 1 because Excel's serial starts at 1
    // Add the serial number of days minus one day (since JS dates start at 0)
    return new Date(excelEpoch.getTime() + (serial - 1) * 24 * 60 * 60 * 1000)
}

export async function getGrade6(callback: Function) {
    const db = getDatabase()
    const collectionRef = fbRef(db, '/documents/users')
    const filteredQuery = query(collectionRef, orderByChild('dateOfBirth'))
    // return new Promise((resolve, reject) => {
    // The day and month we want to match
    const targetDay = 29 // For example, July 10
    const targetMonth = 9 // Month index is zero-based in JavaScript (0 = January, so 6 = July)

    onValue(filteredQuery, snapshot => {
        const data = snapshot.val()
        if (data) {
            const matchedUsers: any[] = []

            Object.keys(data).forEach(userId => {
                const dateSerial = data[userId].dateOfBirth
                const date = convertSerialDate(dateSerial)

                if (date.getDate() === targetDay && date.getMonth() === targetMonth) {
                    matchedUsers.push(data[userId])
                }
            })
            callback(matchedUsers)
            // return matchedUsers
            // resolve(matchedUsers)

            // console.log(matchedUsers)
        } else {
            // console.log('No data available')
            // reject(new Error('Data is not an object'))
            // return []
            callback([])
        }
        // })

        // onValue(filteredQuery, snapshot => {
        //     const data = snapshot.val()
        //     if (data && typeof data === 'object') {
        //         resolve(data)
        //     } else if (data === null) {
        //         resolve([]) // Resolve with an empty array if no data exists
        //     } else {
        //         reject(new Error('Data is not an object')) // Reject with an error if data is not an object
        //     }
        // }, error => {
        //     reject(error) // Handle any database-related errors
        // })
    })
}

export async function updateData(collection: string, data: any): Promise<void> {
    const db = getDatabase()
    const collectionRef = fbRef(db, collection)

    return new Promise((resolve, reject) => {
        update(collectionRef, data)
            .then(() => resolve())
            .catch(error => reject(error))
    })
}

export async function deleteRecord(collection: string): Promise<void> {
    const db = getDatabase()
    const collectionRef = fbRef(db, collection)

    return new Promise((resolve, reject) => {
        remove(collectionRef)
            .then(() => resolve())
            .catch(error => reject(error))
    })
}

export async function deleteStorage(imageName: string): Promise<void> {
    const desertRef = storageRef(storage, imageName)
    return new Promise((resolve, reject) => {
        deleteObject(desertRef).then(() => {
            resolve()
        }).catch((error: any) => {
            reject(error)
        })
    })
}

export async function pushData(collection: string, data: any): Promise<void> {
    const db = getDatabase()
    const collectionRef = fbRef(db, collection)
    const newRef = push(collectionRef)
    return new Promise((resolve, reject) => {
        set(newRef, data)
            .then(() => { resolve() })
            .catch(error => reject(error))
    })
}

export async function fbLogout() {
    const auth = getAuth(fbapp)
    return new Promise((resolve, reject) => {
        signOut(auth)
            .then(() => {
                resolve(true)
            }).catch(error => {
                reject(error)
            })
    })
}

function resetIndexedDB() {
    throw new Error('Function not implemented.')
}
