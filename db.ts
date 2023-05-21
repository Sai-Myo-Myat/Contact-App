import * as SQLite from 'expo-sqlite'


export const db = SQLite.openDatabase("Contact.db")

const getContactPromise = (args:number[] = []) => {
    return new Promise((resolve, reject) => {
        db.exec([{sql: "SELECT *  FROM contact WHERE id = ? ", args}], false, (err,res) => {
            if(err) {
                return reject(err)
            }

            return resolve(res)
        })
    })
}

export const getContact = async (editMode: boolean, id: number, setDob:any) => {
    if ( editMode) {
     return  getContactPromise([id])
                 .then(res => {
                     const result = res[0]["rows"][0]
                     console.log(result, "result from promise")
                     setDob(result.dateOfBirth)
                     return result
                 })
                 .catch(err => console.log(err))
    }
 }

export let  dbObj = {
    dataArray:[]
}