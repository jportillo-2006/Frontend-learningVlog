export const CommentItem = ({ name, content, createdAt }) => (
  <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-2xl shadow-sm bg-white">

    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg">
      {name.charAt(0).toUpperCase()}
    </div>

    <div className="flex-1">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>

      <p className="mt-1 text-gray-700">{content}</p>
    </div>
  </div>
)