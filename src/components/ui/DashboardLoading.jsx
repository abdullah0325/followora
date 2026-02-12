export default function DashboardLoading() {
    return (
        <div className="p-6 space-y-6">
            {/* Header Skeleton */}
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />

            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-24 bg-gray-200 rounded-lg animate-pulse"
                    />
                ))}
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-lg shadow p-4">
                {/* Table Head */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-4 bg-gray-200 rounded animate-pulse"
                        />
                    ))}
                </div>

                {/* Table Rows */}
                {[1, 2, 3, 4, 5].map((row) => (
                    <div
                        key={row}
                        className="grid grid-cols-4 gap-4 mb-3"
                    >
                        {[1, 2, 3, 4].map((col) => (
                            <div
                                key={col}
                                className="h-4 bg-gray-100 rounded animate-pulse"
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
