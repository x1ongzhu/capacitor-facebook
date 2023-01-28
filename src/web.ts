import { WebPlugin } from '@capacitor/core';

import type { FacebookPlugin } from './definitions';

export class FacebookWeb extends WebPlugin implements FacebookPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
