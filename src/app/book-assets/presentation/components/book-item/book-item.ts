import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; // <--- Truco: Trae todo lo de las cards
import { MatButtonModule } from '@angular/material/button';
import { Book } from '../../../domain/model/book.entity'; // Asegúrate que la ruta sea correcta
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-book-item',
  standalone: true,
  // Importamos el módulo de Cards y el de Botones
  imports: [MatCardModule, MatButtonModule, TranslatePipe],
  templateUrl: './book-item.html',
  styleUrl: './book-item.css'
})
export class BookItemComponent {
  // Declaramos que este componente RECIBE obligatoriamente un Libro

  book = input.required<Book>();
}
