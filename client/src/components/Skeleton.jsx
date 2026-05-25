export function ProductSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-[#1a1a1a]" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-[#1a1a1a] rounded w-1/3" />
        <div className="h-4 bg-[#1a1a1a] rounded w-2/3" />
        <div className="h-4 bg-[#1a1a1a] rounded w-1/2" />
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
