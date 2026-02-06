import { useEffect, useState } from "react";
import type { Snippet } from "../../types/Snippet"
import { LuCopy } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";

const withAlpha = (hex: string, alpha: number) => {
  const value = hex.replace("#", "")
  if (value.length !== 6) return hex
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const SnippetCard = ({snippet, categoryName, categoryColor} : {snippet: Snippet, categoryName: string, categoryColor: string}) => {

  const [isClicked, setIsClicked] = useState(false);

  useEffect (() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        setIsClicked(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isClicked]);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.content)
    setIsClicked(true);
  }

  return (
    <div 
      className="w-full rounded-lg bg-[#0A0A0A] h-full border border-[#161616] py-4 px-6 transition-shadow duration-200 cursor-pointer flex items-center justify-between gap-4"
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 22px ${withAlpha(categoryColor, 0.35)}`}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
    >
      <div className="flex flex-col h-full gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-lg text-white truncate">{snippet.title}</p>
          <span className="text-[10px] py-0.5 px-1 rounded-sm border" style={{color: categoryColor ? categoryColor : 'gray', backgroundColor: withAlpha(categoryColor, 0.1), borderColor: withAlpha(categoryColor, 0.1)}}>{categoryName}</span>
        </div>
        <p className="text-sm text-gray-400 line-clamp-3">{snippet.content}</p>
      </div>
        <button
          className={`shrink-0 p-3 border rounded-lg ${isClicked ? 'bg-green-500/30 border-green-500/50 text-green-500' : 'bg-[#1A1A1A] border-[#161616] opacity-50 text-white'} transition-colors duration-200 hover:opacity-100 cursor-pointer`}
          onClick={handleCopy}
        >
          {isClicked ? <FaCheck size={15}/> : <LuCopy size={15}/>}
        </button>
    </div>
  )
}

export default SnippetCard