import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar';
import { Footer } from '../footer/footer';
import { BookCatalogueComponent } from '../../../../book-assets/presentation/components/book-catalogue/book-catalogue';

@Component({
  selector: 'app-layout',
  imports: [
    ToolbarComponent,
    BookCatalogueComponent,
    Footer
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Main shell component that orchestrates the layout.
 * It acts as the container for the global header, the main content area (Book Catalogue),
 * and the global footer.
 */
export class Layout {
}
