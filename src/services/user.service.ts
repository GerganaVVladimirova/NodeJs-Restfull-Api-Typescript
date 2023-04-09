import { Request, Response, NextFunction } from 'express';

import fs from 'fs';

import { UserModel } from './../models/user.model';
import { ErrorCustom } from './../models/error.model';

import { checkDataPost } from './../utils/check-data-post.utility';
import { checkDataPut } from './../utils/check-data-put.utility';

interface Params {
  [key: string]: string;
}

const getUserById = ( params: Params, users: UserModel[]): UserModel | ErrorCustom => {
  
  if (!params['id']) {

    const error: ErrorCustom = {
      status: 400,
      message: 'No id',
    };

    return error;
  }

  const user: UserModel | undefined = users.find(
    (user) => user.id === parseInt(params['id'])
  );

  if (!user) {

    const error: ErrorCustom = {
      status: 404,
      message: 'No user found with that id',
    };

    return error;
  }

  return user;
};

const DeleteUser = (params: Params,users: UserModel[]): UserModel[] | ErrorCustom => {
  
  if (!params['id']) {

    const error: ErrorCustom = {
      status: 400,
      message: 'No id',
    };

    return error;
  }

  const index: number = users.findIndex((object: UserModel) => {return object.id === parseInt(params['id']);});

  if (index < 0) {

    const error: ErrorCustom = {
      status: 404,
      message: 'No user found with that id',
    };
    return error;

  } else {
    users.splice(index, 1);

    let newDataUsersJson: string = JSON.stringify(users, null, 2);
    fs.writeFileSync('src/data-ts.json', newDataUsersJson);

    return users;
  }
};

const PostUser = (body: UserModel,users: UserModel[]): UserModel | ErrorCustom => {

  const check = checkDataPost(body, users);
  
  if (check === false) {

    const error: ErrorCustom = {
      status: 400,
      message: 'The entered data is incorrect',
    };

    return error;

  } else {

    const idcounter: number = users[users.length - 1]['id'] + 1;

    let newUser: UserModel = {
      id: idcounter,
      firstName: body.firstName,
      lastName: body.lastName,
      age: body.age,
      coolness: body.coolness,
    };

    users.push(newUser);

    let newDataUsersJson: string = JSON.stringify(users, null, 2);
    fs.writeFileSync('src/data-ts.json', newDataUsersJson);

    return newUser;
  }
};

const PutUser = ( body: UserModel, params: Params, users: UserModel[]): UserModel | ErrorCustom => {
  
  if (!params['id']) {
    const error: ErrorCustom = {
      status: 400,
      message: 'No id',
    };

    return error;
  }

  const userToChange: UserModel | undefined = users.find((user) => user.id === parseInt(params['id'])
  );

  if (!userToChange) {

    const error: ErrorCustom = {
      status: 404,
      message: 'No user found with that id',
    };

    return error;

  } else {
    const check = checkDataPut(body, users);

    if (check === false) {
      const error: ErrorCustom = {
        status: 400,
        message: 'The entered data is incorrect',
      };

      return error;

    } else {

      let newUser: UserModel = {
        id: userToChange.id,
        firstName: body.firstName,
        lastName: body.lastName,
        age: body.age,
        coolness: body.coolness,
      };

      const index: number = users.findIndex((object: UserModel) => { return object.id === parseInt(params['id']);
      });

      users.splice(index, 1, newUser);

      let newDataUsersJson: string = JSON.stringify(users, null, 2);
      fs.writeFileSync('src/data-ts.json', newDataUsersJson);
      return newUser;
    }
  }
};

const PatchUser = ( body: UserModel, params: Params, users: UserModel[]): UserModel | ErrorCustom => {
  
  if (!params['id']) {
    const error: ErrorCustom = {
      status: 400,
      message: 'No id',
    };

    return error;
  }

  const userToChange: UserModel | undefined = users.find( (user) => user.id === parseInt(params['id'])
  );

  if (!userToChange) {
    const error: ErrorCustom = {
      status: 404,
      message: 'No user found with that id',
    };
    return error;

  } else {

    let newUser: UserModel = {
      id: userToChange.id,
      firstName: !body.firstName ? userToChange.firstName : body.firstName,
      lastName: !body.lastName ? userToChange.lastName : body.lastName,
      age: !body.age ? userToChange.age : body.age,
      coolness: !body.coolness ? userToChange.coolness : body.coolness,
    };

    const check = checkDataPut(newUser, users);

    if (check === false) {
      const error: ErrorCustom = {
        status: 400,
        message: 'The entered data is incorrect',
      };

      return error;

    } else {
      const index: number = users.findIndex((object: UserModel) => { return object.id === parseInt(params['id']);
      });

      users.splice(index, 1, newUser);

      let newDataUsersJson: string = JSON.stringify(users, null, 2);
      fs.writeFileSync('src/data-ts.json', newDataUsersJson);
      return newUser;
    }
  }
};

const UserService = {
  getUserById,
  DeleteUser,
  PatchUser,
  PostUser,
  PutUser,
};

export default UserService;
