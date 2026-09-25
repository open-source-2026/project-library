import { Component, inject, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BookStore } from '../../../application/book-store';
import { BookListComponent } from '../book-list/book-list';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-book-catalogue',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    BookListComponent,
    TranslatePipe
  ],
  templateUrl: './book-catalogue.html',
  styleUrl: './book-catalogue.css'
})
/**
 * Smart component that acts as the main view for the book catalogue.
 * It orchestrates state via BookStore and delegates rendering to dumb components.
 */
export class BookCatalogueComponent implements OnInit {
  /** Injected store to manage application state. */
  protected store = inject(BookStore);

  /**
   * Lifecycle hook to load the default category on initialization.
   */
  ngOnInit(): void {
    // Load software engineering books by default when the component initializes
    this.store.selectCategory('software+engineering');
  }

  /**
   * Handles category selection from the toggle buttons.
   * @param category The selected category query.
   */
  onCategoryChange(category: string): void {
    this.store.selectCategory(category);
  }
}
