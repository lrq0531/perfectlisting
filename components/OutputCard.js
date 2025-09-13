export default function OutputCard({ result }) {
  if (!result) {
    return (
      <div className="p-4 bg-white border rounded text-gray-500">
        No result yet — generate a listing.
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border rounded space-y-4">
      <div>
        <div className="text-sm text-gray-500">Title</div>
        <div className="font-medium">{result.title}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Description</div>
        <div className="text-sm">{result.description}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Tags</div>
        <div className="flex flex-wrap gap-2">
          {result.tags &&
            result.tags.map((t, i) => (
              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {t}
              </span>
            ))}
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Social caption</div>
        <div className="text-sm">{result.social_caption}</div>
      </div>
    </div>
  );
}
