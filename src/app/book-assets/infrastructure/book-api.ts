import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Book } from '../domain/model/book.entity';
import { OpenLibraryResponse } from './book-response';
import { BookAssembler } from './book-assembler';

/**
 *
 * Book API is in charge of communicating with the extern API
 *
 * */

@Injectable({ providedIn: 'root' })
export class BookApi {
  private http = inject(HttpClient);
  private assembler = inject(BookAssembler);

  // Leemos el environment que configuramos hace rato
  private baseUrl = environment.openLibraryApiBaseUrl;
  private searchEndpoint = environment.openLibrarySearchEndpointPath;

  /**
   * Llama a la API, aplica filtros, y retorna entidades puras
   * @param categoryQuery ej: 'software+engineering' o 'artificial+intelligence'
   */
  getBooksByCategory(categoryQuery: string): Observable<Book[]> {
    const url = `${this.baseUrl}${this.searchEndpoint}`;

    /**
     * You can use page since return this.http until map
     * */

    return this.http.get<OpenLibraryResponse>(url, {
      params: {
        q: categoryQuery,
        fields: 'key,title,author_name,first_publish_year,edition_count,cover_i',
        limit: '12'
      }
    }).pipe(
      map(response => this.assembler.toEntitiesFromResponse(response))
    );


  }
}
