import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LanguageSwitcher } from '../language-switcher/language-switcher'; // Ajusta la ruta si es necesario
import { LogoDevApi } from '../../../infrastructure/logo-dev-api'; // Ajusta la ruta a tu servicio
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    LanguageSwitcher, // Injecting your professor's switcher here!
    TranslatePipe
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
/**
 * Presentation component that renders the top navigation bar.
 * Contains the branding logo and the language switcher.
 */
export class ToolbarComponent {
  /** Injected service to fetch external branding logos. */
  private logoApi = inject(LogoDevApi);

  /**
   * Holds the URL for the Open Library logo.
   * Assuming your API service has this method name.
   */
  logoUrl: string = this.logoApi.getUrlToLogo('openlibrary.org'); // --
}
