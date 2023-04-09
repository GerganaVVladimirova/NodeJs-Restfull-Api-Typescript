import UserService from './../services/user.service';

import { UserModel } from './../models/user.model';


import { Request, Response, NextFunction } from 'express';
import { ErrorCustom } from 'src/models/error.model';


const GetUserByID = (req: Request, res: Response) => {
  const result:UserModel|ErrorCustom = UserService.getUserById(req.params, res.locals.users);
  if ('status' in result) {
    res.status(result.status).send(result.message);
  } else {
    res.status(200).json(result);
  }
};

const GetAllUSers = (req: Request, res: Response) => {
    let users: UserModel[] = res.locals.users;
   console.log(res.locals.users)
    res.status(200).json(users);  
};

const DeleteUSer =(req: Request, res: Response) => {
  const result:(UserModel[])|ErrorCustom = UserService.DeleteUser(req.params, res.locals.users);
  if ('status' in result) {
    res.status(result.status).send(result.message);
  } else {
    res.status(200).json(result);
  }
}


const PostUser =(req: Request, res: Response) => {
  // const data: UserModel = req.body;
  // console.log(data)
  const newUser:UserModel|ErrorCustom = UserService.PostUser(req.body, res.locals.users);
  if ('status' in newUser) {
    res.status(newUser.status).send(newUser.message);
  } else {
    res.status(200).json(newUser);
  }
}


const PutUser =(req: Request, res: Response) => {
  const result:UserModel|ErrorCustom = UserService.PutUser(req.body,req.params, res.locals.users);
  if ('status' in result) {
    res.status(result.status).send(result.message);
  } else {
    res.status(200).json(result);
  }
}


const PatchUser =(req: Request, res: Response) => {
  const resultPatch:UserModel|ErrorCustom = UserService.PatchUser(req.body,req.params, res.locals.users);
  if ('status' in resultPatch) {
    res.status(resultPatch.status).send(resultPatch.message);
  } else {
    res.status(200).json(resultPatch);
  }
}


const USerController = {
  GetUserByID,
  GetAllUSers,
  DeleteUSer,
  PatchUser,
  PostUser,
  PutUser

};
export default USerController;
