const GALLERY_API_URL = 'https://images-api.nasa.gov/search';

export async function getGalleryImages(query) {
  const response = await fetch(`${GALLERY_API_URL}?media_type=image&page_size=12&q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error(`Server membalas dengan kode ${response.status}.`);
  }

  const result = await response.json();
  return result.collection.items;
}
