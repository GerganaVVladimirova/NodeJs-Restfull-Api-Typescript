import { Router } from 'express';

import  userRouter  from './user.router';

const appRouter: Router = Router();

appRouter.use('/users', userRouter);

export default appRouter;
