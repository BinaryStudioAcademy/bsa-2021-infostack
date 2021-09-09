import { storeSetup } from './store-setup.content';
import { configureStore } from './configure-store.content';
import { getDefaultMiddleware } from './get-default-middleware.content';
import { immutabilityMiddleware } from './immutability-middleware.content';
import { serializabilityMiddleware } from './serializability-middleware.content';

export const storeSetupContent = [
  ...storeSetup,
  ...configureStore,
  ...getDefaultMiddleware,
  ...immutabilityMiddleware,
  ...serializabilityMiddleware,
];
