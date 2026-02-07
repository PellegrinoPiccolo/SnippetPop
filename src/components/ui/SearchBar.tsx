import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const SearchBar = ({searchText, onSearchTextChange, textPlaceholder} : {searchText: string, onSearchTextChange: (text: string) => void, textPlaceholder: string}) => {
  return (
    <div className="w-full px-4 py-2 border border-[#2E2E2E] bg-[#161616] rounded-md text-sm text-white flex flex-row items-center opacity-70 focus-within:opacity-100">
        <IoIosSearch className="mr-2" />
        <input
            type="text"
            placeholder={textPlaceholder}
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
            className="w-full focus:outline-none bg-transparent"
        />
        {searchText && (
            <button onClick={() => onSearchTextChange("")} className="ml-2 cursor-pointer hover:bg-gray-400/30 p-1 rounded">
                <IoClose />
            </button>
        )}
    </div>
  )
}

export default SearchBar