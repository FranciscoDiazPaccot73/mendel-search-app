const Skeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-skeleton h-3 rounded-md animate-pulse w-full" />
      <div className="bg-skeleton h-3 rounded-md animate-pulse w-full" />
      <div className="bg-skeleton h-3 rounded-md animate-pulse w-1/3" />
    </div>
  )
}

export default Skeleton;
