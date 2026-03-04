export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border p-6 rounded-lg">
          <p className="text-sm text-muted-foreground">Total product</p>
          <p className="text-2xl font-bold">--</p>
        </div>

        <div className="border p-6 rounded-lg">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-bold">--</p>
        </div>

        <div className="border p-6 rounded-lg">
          <p className="text-sm text-muted-foreground">Orders</p>
          <p className="text-2xl font-bold">--</p>
        </div>
      </div>
    </div>
  );
}