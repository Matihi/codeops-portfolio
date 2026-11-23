const EventSkeleton = () => {
  const style = "bg-zinc-500 p-0.5 h-4 rounded-md";
  const list = [1, 2, 3, 4, 5];
  const skeletonElements = list.map((element) => (
    <article
      key={element}
      className="bg-sky-200 h-60 flex flex-col p-2 pt-3 gap-3 rounded-md animate-pulse"
    >
      <p className="bg-zinc-500 p-0.5 h-11 rounded-md"></p>
      <p className={style}></p>
      <p className={style}></p>
      <p className={style}></p>
      <p className={style}></p>
      <p className={style}></p>
    </article>
  ));
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-2">
      {skeletonElements}
    </div>
  );
};

export default EventSkeleton;
