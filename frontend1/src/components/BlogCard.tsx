interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate
}: BlogCardProps) => {
  return (
    <div className="border-b border-gray-200 pb-6 pt-4 hover:bg-gray-50 transition-all cursor-pointer px-4">
      <div className="flex items-center gap-3 mb-3">
        <Avatar name={authorName} />
        <div className="text-sm text-gray-700">
          <div className="font-semibold">{authorName}</div>
          <div className="text-xs text-gray-500">{publishedDate}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-lg font-bold text-gray-900">
          {title}
        </div>
        <div className="text-sm text-gray-700 leading-relaxed">
          {content.slice(0, 150) + "..."}
        </div>
      </div>
      <div className=" w-full text-slate-400 pt-4 text-sm">
        {`${Math.ceil(content.length/100)} minute(s) read`}
      </div>
    </div>
  );
};

export function Avatar({ name }: { name: string }) {
  return (
    <div className="w-9 h-9 bg-gray-500 rounded-full flex items-center justify-center text-white font-medium text-sm uppercase">
      {name[0]}
    </div>
  );
}
