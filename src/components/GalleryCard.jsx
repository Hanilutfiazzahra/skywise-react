export default function GalleryCard({ title, date, imageUrl }) {
  const parsedDate = new Date(date);
  const dateText = isNaN(parsedDate)
    ? ''
    : parsedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <article className="gallery-card">
      {imageUrl && <img src={imageUrl} alt={title} loading="lazy" />}
      <div className="gallery-card-body">
        <h3>{title}</h3>
        <span className="gallery-date">{dateText}</span>
      </div>
    </article>
  );
}
