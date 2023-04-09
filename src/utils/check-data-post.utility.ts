import { UserModel } from './../models/user.model';


export function checkDataPost (body:UserModel,users:UserModel[]):boolean {
  const data: UserModel = body;
  console.log(data)
  let check: boolean = true;

  if (
    !data.hasOwnProperty('firstName') &&
    !data.hasOwnProperty('lastName') &&
    !data.hasOwnProperty('age') &&
    !data.hasOwnProperty('coolness')
  ) {
    check = false; 
  } 
  if (
    users.find((object: UserModel) => object.firstName === data.firstName) ||
    users.find((object: UserModel)=> object.lastName === data.lastName)
  ) {
    check = false;

  }
  if (
    typeof data.firstName !== 'string' ||
    typeof data.lastName !== 'string' ||
    typeof data.age !== 'number' ||
    typeof data.coolness !== 'number'
  ) {
    check = false;
  } else if (typeof data.firstName === 'string' && data.firstName === '') {
    check = false;
  } else if (typeof data.lastName === 'string' && data.lastName === '') {
    check = false;
  } else if (data.age <= 0  || data.age >= 100) {
    check = false;
  } else if ( data.coolness < 1 || data.coolness > 10) {
    check = false;
  }
  console.log(check)
  return check
}