import { registerPlugin } from '@capacitor/core';

import type { FacebookPlugin } from './definitions';

const Facebook = registerPlugin<FacebookPlugin>('Facebook', {
  web: () => import('./web').then(m => new m.FacebookWeb()),
});

export * from './definitions';
export { Facebook };
