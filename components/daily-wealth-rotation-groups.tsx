export function DailyWealthRotationGroups() {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Daily Wealth Rotation Groups</h2>
      {/* Customize your daily table here */}
      {/* <div>Table for Daily Groups</div> */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">GROUP</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">MEMBERS</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">BUDGET</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">COMPLETION</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">ACTION</th>
            </tr>
          </thead>
          
        </table>
      </div>
    </div>
  )
}
