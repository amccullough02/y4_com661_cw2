import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * Initialises and bootstraps the application with the specified configuration.
 * @returns A promise that resolves to the `ApplicationRef` of the bootstrapped application.
 */
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
