// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
    // if numbers are less than 1 or more than 10
    // if (typeof id !== 'number'||id,1 || id > 10) {
    //     console.log("Invalid ID: The ID is expected to be not less than 1 and not more than 10");
        
    // }
 const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };

//  step one find users in the database using central
const dataBaseName = await central(id);
console.log(dataBaseName);

// step two user's basic info
const basicInfo = await dbs[dataBaseName](id)
console.log(basicInfo);

// step three access to vault and steal personal data

const personalData= await vault(id);
console.log(personalData);
return {...basicInfo,
    ...personalData
}
// refactoring
return Promise.all([central(id), vault(id)]).then(([dataBaseName, personalData]) => {
    return dbs[dataBaseName](id).then(basicInfo => {
        return {...basicInfo, ...personalData}
    });
   
});
}


const user = await getUserData(6)
console.log(user);



 // test
 getUserData(6).then (user => console.log(user));

//  test
// Valid numbers – 1 through 10 (inclusive).
[1,2,3,4,5,6,7,8,9,10].forEach(id =>{
    getUserData(id).then (user => console.log('The user data for ID ${id);', user
    ))
});

// Invalid numbers – less than 1 or higher than 10.

[0,11].forEach(id => {
    getUserData(id).then(user => console.log('THe user data for ID $(id):', user));
    
})

// Invalid data types – strings, Booleans, etc.
['string', true, false, undefined, {}, []].forEach(id =>{
    getUserData(id).then(user =>
    console.log('The user data for ID ${id}:',user) ).catch(error =>console.error('Error for ID ${id}:',error.message));
    
});