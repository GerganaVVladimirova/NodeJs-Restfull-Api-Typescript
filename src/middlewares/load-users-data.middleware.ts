import fs from 'fs';

import { Request, Response, NextFunction } from 'express';


import { UserModel } from './../models/user.model';

const loadUsersData = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.locals.users = null;
    const data:Buffer = fs.readFileSync('src/data-ts.json');
    res.locals.users = JSON.parse(data.toString());

    next();
    
  } catch {
    throw new Error('error reading file');
  }
};

const GetUsersMiddleware = {
  loadUsersData
}

export default GetUsersMiddleware;






