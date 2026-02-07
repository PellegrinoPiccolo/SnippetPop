import { useContext, useEffect, useState } from "react";
import type { Snippet } from "../../types/Snippet"
import { LuCopy } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalContext } from "../../context/ModalContext";
import DeleteWarning from "./DeleteWarning";
import { SnippetContext } from "../../context/SnippetContext";

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
  const {openModal} = useContext(ModalContext)
  const {deleteSnippet} = useContext(SnippetContext)

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

  const handleDelete = () => {
    openModal(
      <DeleteWarning onDelete={() => deleteSnippet(snippet.id)} numberOfItems={null} itemName={snippet.title} />
    )
  }

  return (
    <div 
      className="w-full rounded-lg bg-[#0A0A0A] h-full border border-[#161616] py-4 px-6 transition-shadow duration-200 flex items-center justify-between gap-4 group"
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
        <div className="shrink-0 flex flex-row items-center gap-2">
          <button className="bg-red-500/10 p-3 rounded-lg hidden group-hover:flex border border-red-500/30 opacity-70 hover:opacity-100 cursor-pointer" onClick={handleDelete}>
            <FaRegTrashAlt size={15} className="text-red-500"/>
          </button>
          <button
            className={`p-3 border rounded-lg ${isClicked ? 'bg-green-500/30 border-green-500/50 text-green-500' : 'bg-[#1A1A1A] border-[#161616] opacity-50 text-white'} transition-colors duration-200 hover:opacity-100 cursor-pointer`}
            onClick={handleCopy}
          >
            {isClicked ? <FaCheck size={15}/> : <LuCopy size={15}/>}
          </button>
        </div>
    </div>
  )
}

export default SnippetCard