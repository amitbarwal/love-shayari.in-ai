export default function AdminDashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard title="Total Posts" value="0" />
                <DashboardCard title="Categories" value="0" />
                <DashboardCard title="Tags" value="0" />
                <DashboardCard title="Published" value="0" />
            </div>

            <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    {/* TODO: Add quick action buttons */}
                </div>
            </div>
        </div>
    );
}

function DashboardCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
    )
}
