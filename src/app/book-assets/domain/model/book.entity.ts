import { Url } from '../../../shared/domain/model/url';

/**
 * Main entity representing a book
 */
export class Book {
  key: string = '';
  title: string = '';
  authorName: string = '';
  firstPublishYear: number = 0;
  editionCount: number = 0;
  coverUrl!: Url;
  detailsUrl!: Url;

  constructor() {}
}
