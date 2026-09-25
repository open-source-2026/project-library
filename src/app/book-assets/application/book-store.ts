import { computed, inject, Injectable, signal } from '@angular/core';
import { Book } from '../domain/model/book.entity';
import { BookApi } from '../infrastructure/book-api';

@Injectable({ providedIn: 'root' })
export class BookStore {
  // Inyectamos nuestro mensajero de la infraestructura
  private bookApi = inject(BookApi);

  // ==========================================
  // 1. ESTADO PRIVADO (La Memoria Caché / Signals)
  // ==========================================

  // Un Diccionario. Llave: "categoría" -> Valor: "Lista de Libros"
  private booksCacheSignal = signal<Record<string, Book[]>>({});

  // Guarda el texto de la categoría actual (ej: 'software+engineering')
  private _currentCategory = signal<string>('');

  // ==========================================
  // 2. SELECTORES PÚBLICOS (Para el HTML)
  // ==========================================

  // El HTML se suscribirá aquí. Solo escupe los libros de la categoría seleccionada.
  readonly currentBooks = computed(() => {
    const category = this._currentCategory();
    if (!category) return [];
    // Retorna los libros del caché, o un arreglo vacío si no existen
    return this.booksCacheSignal()[category] ?? [];
  });

  // (Opcional pero útil) Para que el HTML sepa qué botón pintar como "Activo"
  readonly activeCategory = computed(() => this._currentCategory());

  // ==========================================
  // 3. ACCIONES (Comandos)
  // ==========================================

  /**
   * Se ejecuta cuando el usuario hace clic en uno de los Toggle Buttons.
   * @param categoryQuery ej: 'software+engineering' o 'artificial+intelligence'
   */
  selectCategory(categoryQuery: string): void {
    // 1. Actualizamos cuál es la categoría actual
    this._currentCategory.set(categoryQuery);

    // 2. Leemos la memoria caché actual
    const currentCache = this.booksCacheSignal();

    // 3. Revisamos si ya tenemos descargados los libros de esta categoría
    if (!currentCache[categoryQuery]) {

      // No los tenemos. Los pedimos a internet a través del API.
      this.bookApi.getBooksByCategory(categoryQuery).subscribe(books => {

        // Cuando llegan, actualizamos el Diccionario usando el "spread operator" {...}
        // Esto guarda los nuevos libros sin borrar las categorías que ya estaban guardadas.
        this.booksCacheSignal.set({ ...currentCache, [categoryQuery]: books });
      });
    }
  }
}
