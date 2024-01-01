import { IndexationService } from 'src/infra/services/indexation.service';
import {
  getDocument,
  deleteIndex,
  insertDocument,
} from 'test/utils/indexation';
import { expect, describe } from '@jest/globals';

describe.only('IndexationService', () => {
  it('should index document', async () => {
    await deleteIndex('doctype');

    const indexationService = new IndexationService();

    const document = { id: 123, name: 'doc_name' };
    await indexationService.index('documents', '1', document);

    const documentInDb = await getDocument('documents', '1');
    expect(document).toEqual(documentInDb);
  });

  it('should search document', async () => {
    await deleteIndex('doctype');

    const document1 = {
      id: 99123,
      title: 'The Majestic Equines: A Glimpse into the World of Horses',
      body: 'In the vast tapestry of the animal kingdom, horses stand as magnificent and noble creatures, embodying strength, grace, and companionship. These steadfast companions have played pivotal roles throughout history, serving as loyal allies in agriculture, transportation, and even warfare. Today, horses continue to captivate our hearts with their beauty and versatility, forging enduring connections with humans around the globe.',
    };
    await insertDocument('animals', document1.id.toString(), document1);
    const document2 = {
      id: 99124,
      title: 'The Enchanting World of Cats',
      body: 'Cats, the graceful companions of countless households, effortlessly weave their way into our hearts with their mysterious charm and independent spirit. With a penchant for lounging in sunlit spots and a playful agility that captivates, these feline friends effortlessly embody the epitome of elegance and companionship. In the quiet purrs and gentle nudges, we find a timeless connection that transcends words, making cats cherished members of our homes and our hearts.',
    };
    await insertDocument('animals', document2.id.toString(), document2);

    const indexationService = new IndexationService();

    const result1 = await indexationService.search('animals', 'Equines');
    expect(result1).toEqual([document1]);

    const result2 = await indexationService.search('animals', 'companions');
    expect(result2).toEqual([document1, document2]);
  });
});
