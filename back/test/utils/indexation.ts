import { Client } from 'es8';

export async function deleteIndex(index: string): Promise<void> {
  const client = new Client({
    node: process.env.ELASTICSEARCH_URL,
  });

  if (await client.indices.exists({ index })) {
    await client.indices.delete({
      index,
    });
  }

  await client.close();
}

export async function getDocument(index: string, id: string): Promise<unknown> {
  const client = new Client({
    node: process.env.ELASTICSEARCH_URL,
  });

  const result = await client.get({
    index,
    id,
  });

  await client.close();

  return result._source;
}

export async function insertDocument(
  index: string,
  document: any,
): Promise<void> {
  const client = new Client({
    node: process.env.ELASTICSEARCH_URL,
  });

  await client.index({
    index,
    id: `${index}_${document.id}`,
    body: document,
  });

  await client.indices.refresh({ index });
  await client.close();
}
