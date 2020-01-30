import { Express, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const attachTo = (app: Express, controllersFactory: any) => {
  app.get('/404', (req: Request, res: Response) => {
    res.send('THE PAGE YOU ARE LOOKIN FOR DOES NOT EXIST');
  });

  const attach = (modulePath: string) => {
    require(modulePath).attach(app, controllersFactory);
  };

  const traverse = (dir: string) => {
    const directory = fs.readdirSync(dir);
    const tsFiles: string[] = [];
    const subDirs: string[] = [];

    directory.forEach((entry: string) => {
      if (entry.includes('router.ts') || entry.includes('router.js')) {
        tsFiles.push(entry);
      } else if ((entry.indexOf('.ts') === -1 || entry.indexOf('.js') === -1) && !entry.includes('index')) {
        subDirs.push(entry);
      }
    });

    tsFiles.forEach((file: string) => {
      const absPath = path.join(dir, file);
      attach(absPath);
    });

    if (subDirs.length === 0) {
      return;
    }

    subDirs.forEach((subDir: string) => {
      const newDir = path.join(dir, subDir);
      traverse(newDir);
    });
  }

  traverse(__dirname);

  app.get('*', (req: Request, res: Response) => {
    res.redirect('/404');
  });
}