import {Router} from 'express';

import { HealthController } from '../../health/health-controller';

const healthController = new HealthController();

export default (router: Router): void => {
  router.get("/health", healthController.run.bind(healthController));
};
