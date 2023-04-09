import { Router } from 'express';

import UserController from './../controllers/user.controller';
import GetUsersMiddleware from './../middlewares/load-users-data.middleware';

const userRoute = Router();

userRoute.get('/',GetUsersMiddleware.loadUsersData,UserController.GetAllUSers);

userRoute.get('/:id', GetUsersMiddleware.loadUsersData, UserController.GetUserByID);

userRoute.delete('/:id', GetUsersMiddleware.loadUsersData, UserController.DeleteUSer);

userRoute.post('/', GetUsersMiddleware.loadUsersData, UserController.PostUser);

userRoute.put('/:id', GetUsersMiddleware.loadUsersData, UserController.PutUser);

userRoute.patch('/:id', GetUsersMiddleware.loadUsersData, UserController.PatchUser);


export default userRoute;





// userRouter.post('/', loadUsersData, checkData, checkDataPost, post, saveUsersData );


// userRouter.put( '/:id', loadUsersData, loadUserById, checkData, putUser, saveUsersData );

// userRouter.patch( '/:id', loadUsersData, loadUserById, createUserPatch, checkData, patchUser,  saveUsersData );