import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import path from 'path';

type RouteModule = {
  default: (router: Router) => void;
};
export default async (app: Express): Promise<void> => {
  const router = Router();
  app.use('/api', router);

  try {
    const routeFiles = readdirSync(path.join(__dirname, '/../routes')).filter(
      file => !file.includes('.test.'),
    );
    const routePromises = routeFiles.map(async file => {
      const route: RouteModule = await import(`../routes/${file}`);
      return route.default;
    });

    const routes = await Promise.all(routePromises);
    routes.forEach(route => route(router));
  } catch (error) {
    console.error('Error loading routes:', error);
  }
};
