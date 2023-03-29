import jwt from 'jsonwebtoken';

export class AuthMiddleware {
  constructor() { }

  verifyToken(req: any, res: any, next: any) {

    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send("Um token é nescessário para validar");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Token inválido");
    }
    return next();
  }
}