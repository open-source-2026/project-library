/**
 * DTO que representa la respuesta cruda (JSON) de Open Library
 */
  export interface OpenLibraryResponse {
  numFound: number;
  docs: BookResource[];
}

/**
 * DTO que representa un solo libro tal cual viene de la API
 */
export interface BookResource {
  key: string;
  title: string;
  author_name?: string[]; // La API lo manda como array
  first_publish_year?: number;
  edition_count?: number;
  cover_i?: number;       // El ID para armar la imagen
}
