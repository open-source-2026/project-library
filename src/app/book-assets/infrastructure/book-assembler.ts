import { Injectable } from '@angular/core';
import { Book } from '../domain/model/book.entity';
import { BookResource, OpenLibraryResponse } from './book-response';
import { Url } from '../../shared/domain/model/url';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })

/**
 * It is responsible for adapting BookResource to Book
 *
 * BookResource (book-response.ts) (API) → Book (book-entity.ts)
 *
 * */

export class BookAssembler {

  toEntityFromResource(resource: BookResource): Book {
    const book = new Book();
    book.key = resource.key;
    book.title = resource.title;

    // Limpieza: La API manda un array, nosotros lo convertimos a string (ej: "Autor 1, Autor 2")
    book.authorName = resource.author_name ? resource.author_name.join(', ') : 'Unknown Author';

    book.firstPublishYear = resource.first_publish_year || 0;
    book.editionCount = resource.edition_count || 0;

    // Armamos la URL de la portada usando el CDN del environment
    const coverUrl = resource.cover_i
      ? `${environment.openLibraryCoversBaseUrl}${resource.cover_i}-L.jpg`
      : 'https://via.placeholder.com/200x300?text=No+Cover'; // Imagen por defecto si no hay portada

    book.coverUrl = new Url(coverUrl);

    // Armamos la URL para ir a los detalles del libro
    book.detailsUrl = new Url(`https://openlibrary.org${resource.key}`);

    return book;
  }

  toEntitiesFromResponse(response: OpenLibraryResponse): Book[] {
    // Extraemos el array 'docs' y lo transformamos
    return response.docs.map(doc => this.toEntityFromResource(doc));
  }
}
