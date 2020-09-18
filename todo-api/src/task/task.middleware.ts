// import { Injectable, NestMiddleware } from "@nestjs/common";
// import { Request, Response } from "express";

// @Injectable()
// export class TaskMiddleware implements NestMiddleware{
//     use(req: Request, res: Response, next: Function) {
//         const taskCreatedAt = new Date().toLocaleString();
//         req.body.taskCreatedAt = taskCreatedAt;
//         next(); 
//     }
// }

import { Request, Response } from 'express';

export function atCreation(req: Request, res: Response, next: Function) {
    const taskCreatedAt =  new Date();
        req.body.taskCreatedAt = taskCreatedAt;
    console.log("in the middleware function ===>",req.body);
        next(); 
};

export function atListing(req: Request, res: Response, next: Function) {
    console.log("Middleware calling while listing the the task ")
    next();
}
 
export function atBylevel(req: Request, res: Response, next: Function) {
    console.log("Called while getting the task by the level");
    next();
 };