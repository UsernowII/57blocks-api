import { Router } from 'express';

import { Health } from '../../controllers/health/health';

const healthController = new Health();

export default (router: Router): void => {
  router.get('/health', healthController.run.bind(healthController));
};
