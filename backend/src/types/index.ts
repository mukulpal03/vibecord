declare global {
  namespace Express {
    interface Request {
      auth?: any;
      files?: any;
    }
  }
}

export {};
