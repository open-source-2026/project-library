import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Infrastructure gateway for generating source logo URLs using logo.dev.
 */
export class LogoDevApi {
  /** Base URL for the logo provider API. */
  baseUrl = environment.logoProviderApiBaseUrl;
  /** Publishable API key required by the logo provider. */
  apiKey = environment.logoProviderPublishableKey;

  constructor() {
  }

  /**
   * Builds the logo URL for a source website.
   *
   * @param url - A string value containing the website URL.
   */
  getUrlToLogo(url: string): string {
    //console.log('getUrlToLogo', source);
    return `${this.baseUrl}${new URL(url).hostname}?token=${this.apiKey}`;
  }
}
