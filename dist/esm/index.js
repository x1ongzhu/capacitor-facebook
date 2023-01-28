import { registerPlugin } from '@capacitor/core';
const Facebook = registerPlugin('Facebook', {
    web: () => import('./web').then(m => new m.FacebookWeb()),
});
export * from './definitions';
export { Facebook };
//# sourceMappingURL=index.js.map