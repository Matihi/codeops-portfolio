const FilterSkeleton = () => {
  const array = [1, 2, 3, 4, 5];
  const blankDivs = array.map((item) => (
    <div key={item} className="h-4 bg-gray-400 w-30 p-3 rounded"></div>
  ));
  return (
    <div className="flex flex-col sm:flex-row gap-2 flex-wrap bg-sky-200 rounded-xl p-2">
      {blankDivs}
    </div>
  );
};

export default FilterSkeleton;
