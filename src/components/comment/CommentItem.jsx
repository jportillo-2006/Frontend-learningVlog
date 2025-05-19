export const CommentItem = ({ name, content, createdAt }) => (
  <div className="border p-3 rounded">
    <p className="font-semibold">{name}</p>
    <p>{content}</p>
    <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</p>
  </div>
)
