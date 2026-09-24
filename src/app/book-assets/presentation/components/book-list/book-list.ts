import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import { BookItemComponent } from '../book-item/book-item'; // book-item
import { Book } from '../../../domain/model/book.entity';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookItemComponent], // book-item
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush // To Optimize the component (Required)
})
export class BookListComponent {

  /**
   * Presentation component that renders a grid list of book cards.
   */

  /** Input collection of books to display. */

  books = input.required<Array<Book>>();
}
