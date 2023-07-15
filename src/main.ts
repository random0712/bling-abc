import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if(!environment.production) {
  console.warn("DEV MODE: Dont use this configuration in production environment")
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
