interface ArticleCardProp {
  title: string,
  content: string,
  category: string,
  articleImage: string
}


export default function ArticleCard({title, content, category, articleImage}: ArticleCardProp){
  return (
<div className="mx-2 max-w-md overflow-hidden rounded-lg bg-white shadow">
  <img src={`http://localhost:3000/articleImages/${articleImage}`} className="aspect-video w-full object-cover" alt="article image" />
  <div className="p-4">
    <p className="mb-1 text-sm text-primary-500">Andrea Felsted • <time>18 Nov 2022</time></p>
    <h3 className="text-xl font-medium text-gray-900">{title}</h3>
    <p className="mt-1 text-gray-500">{content}</p>
    <div className="mt-4 flex gap-2 justify-between items-center">
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"> {category} </span>
      <button type="button" className="rounded-lg border border-gray-700 bg-gray-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-gray-900 hover:bg-gray-900 focus:ring focus:ring-gray-200 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300">Read More</button>
    </div>
  </div>
</div>

  )
}