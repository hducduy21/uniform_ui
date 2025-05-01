import { ChevronDown } from 'lucide-react';
import { useCallback } from 'react';

export const FilterButton = ({
  label,
  count,
  filterKey,
  setActiveFilter
}: {
  label: string;
  count: number;
  filterKey: string;
  setActiveFilter: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const toggleFilter = useCallback((filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  }, []);
  return (
    <button
      className={`mr-4 flex items-center whitespace-nowrap ${count > 0 ? 'font-medium' : ''}`}
      onClick={() => toggleFilter(filterKey)}
    >
      {label}
      <ChevronDown size={18} className='ml-1' />
      {count > 0 && <span className='ml-1 rounded-full bg-gray-200 px-2 text-xs'>{count}</span>}
    </button>
  );
};
