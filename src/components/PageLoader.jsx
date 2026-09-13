const PageLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Header skeleton */}
        <div className="mb-8 flex items-center justify-between">
          <div className="h-8 w-32 rounded-lg bg-gray-200" />
          <div className="h-10 w-40 rounded-lg bg-gray-200" />
        </div>

        {/* Title skeleton */}
        <div className="mb-8">
          <div className="h-8 w-64 rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-96 max-w-full rounded bg-gray-200" />
        </div>

        {/* Content */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              {/* Image */}
              <div className="h-64 bg-gray-200" />

              {/* Details */}
              <div className="space-y-3 p-4">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-5 w-3/4 rounded bg-gray-200" />

                <div className="flex gap-2">
                  <div className="h-5 w-12 rounded bg-gray-200" />
                  <div className="h-5 w-20 rounded bg-gray-200" />
                </div>

                <div className="h-6 w-28 rounded bg-gray-200" />

                <div className="h-9 w-full rounded-lg bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
