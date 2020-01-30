import { Express, Request, Response } from 'express';
const attachTo = (app: Express, controllersFactory) => {
  app.get('/404', (req: Request, res: Response) => {
    res.send('THE PAGE YOU ARE LOOKIN FOR DOES NOT EXIST');
  });

  const attach = (modulePath: string) => {
    require()
  }
}