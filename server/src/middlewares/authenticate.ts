import { Request, Response, NextFunction } from "express";

export default function authenticate(req: Request, res: Response, next: NextFunction) {
    if (req.user){
        next()
    }else {
        res.json({
            message: 'User not logged in',
            success: false
        })
    }
}