import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState, useEffect, useRef } from 'react';

const CustomSelectBox = ({ data, multiselect = true }) => {
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState(multiselect ? [] : ''); // Array for multiselect, string for single select
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelected = (item) => {
    if (multiselect) {
      const isSelected = selected.some(
        (selectedItem) => selectedItem.toLowerCase() === item.name.toLowerCase()
      );
      if (isSelected) {
        // Remove the item if it is already selected
        setSelected((prev) =>
          prev.filter((i) => i.toLowerCase() !== item.name.toLowerCase())
        );
      } else {
        // Add the item to the selected list
        setSelected((prev) => [...prev, item.name]);
      }
    } else {
      if (item?.name.toLowerCase() !== selected.toLowerCase()) {
        setSelected(item?.name);
        setIsOpen(false);
        setInputValue('');
      }
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displaySelected = () => {
    if (multiselect) {
      if (selected.length === 0) return 'Select Option';
      return selected.length > 3
        ? `${selected.slice(0, 3).join(', ')}... (${selected.length})`
        : selected.join(', ');
    } else {
      return selected
        ? selected.length > 25
          ? selected.substring(0, 25) + '...'
          : selected
        : 'Select Option';
    }
  };

  return (
    <div className="w-72 font-medium relative z-50" ref={dropdownRef}>
      <div
        className={`bg-white w-full p-2 flex items-center justify-between rounded cursor-pointer text-black ${
          !selected || (multiselect && selected.length === 0)
            ? 'text-gray-500'
            : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {displaySelected()}
        <BiChevronDown size={20} className={`${isOpen && 'rotate-180'}`} />
      </div>
      <ul
        className={`bg-white mt-2 rounded overflow-hidden overflow-y-auto absolute top-100 left-0 w-full ${
          isOpen ? 'max-h-60' : 'max-h-0'
        }`}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch scale={18} className="text-gray-700" />
          <input
            type="text"
            placeholder="Search..."
            value={inputValue}
            className="placeholder:text-gray-400 p-2 outline-none bg-white text-black"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelected(item)}
              className={`p-2 cursor-pointer text-sm hover:bg-sky-600 hover:text-white transition ${
                multiselect
                  ? selected.some(
                      (selectedItem) =>
                        selectedItem.toLowerCase() === item.name.toLowerCase()
                    )
                    ? 'bg-sky-600 text-white'
                    : 'text-black'
                  : item?.name.toLowerCase() === selected.toLowerCase()
                  ? 'bg-sky-600 text-white'
                  : 'text-black'
              } ${
                item?.name.toLowerCase().includes(inputValue.toLowerCase())
                  ? 'block'
                  : 'hidden'
              }`}
            >
              {item?.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CustomSelectBox;
