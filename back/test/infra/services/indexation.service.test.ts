import {
  IndexationService,
  Document,
} from 'src/infra/services/indexation.service';
import { getDocument, deleteIndex } from 'test/utils/indexation';

describe('IndexationService', () => {
  it('should index document', async () => {
    await deleteIndex('doctype');

    const indexationService = new IndexationService();

    const document = { id: 123, name: 'doc_name' } as Document;
    await indexationService.index('doctype', document);

    const documentInDb = await getDocument('doctype', 'doctype_123');
    expect(document).toEqual(documentInDb);
  });
});
