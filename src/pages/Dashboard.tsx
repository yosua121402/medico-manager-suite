
import { useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  BadgeDollarSign, 
  Pill, 
  TrendingUp, 
  Bell, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const categoryData = [
  { name: 'Pain Relief', sales: 4000, stock: 80 },
  { name: 'Antibiotics', sales: 3500, stock: 65 },
  { name: 'Allergy', sales: 2800, stock: 90 },
  { name: 'Gastrointestinal', sales: 3200, stock: 75 },
  { name: 'Cardiovascular', sales: 4800, stock: 60 },
];

const recentSales = [
  { id: 1, customer: 'John Smith', amount: 125.50, status: 'completed', time: '10 minutes ago', items: 3 },
  { id: 2, customer: 'Emily Johnson', amount: 89.99, status: 'processing', time: '32 minutes ago', items: 2 },
  { id: 3, customer: 'Michael Davis', amount: 210.75, status: 'completed', time: '1 hour ago', items: 5 },
  { id: 4, customer: 'Sarah Williams', amount: 45.99, status: 'completed', time: '3 hours ago', items: 1 },
];

const lowStockItems = [
  { id: 1, name: 'Lisinopril 10mg', stock: 8, category: 'Cardiovascular' },
  { id: 2, name: 'Amoxicillin 250mg', stock: 12, category: 'Antibiotics' },
  { id: 3, name: 'Ventolin Inhaler', stock: 5, category: 'Respiratory' },
  { id: 4, name: 'Metformin 500mg', stock: 15, category: 'Diabetes' },
];

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - PharmAdmin';
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Inventory Items" 
            value="486" 
            icon={<Package className="h-5 w-5" />}
            trend={5.2}
            trendLabel="from last month"
            variant="primary"
          />
          <StatCard 
            title="Active Customers" 
            value="1,254" 
            icon={<Users className="h-5 w-5" />}
            trend={12.7}
            trendLabel="from last month"
            variant="info"
          />
          <StatCard 
            title="Orders This Month" 
            value="352" 
            icon={<ShoppingCart className="h-5 w-5" />}
            trend={8.3}
            trendLabel="from last month"
            variant="success"
          />
          <StatCard 
            title="Revenue This Month" 
            value="$24,853" 
            icon={<BadgeDollarSign className="h-5 w-5" />}
            trend={14.5}
            trendLabel="from last month"
            variant="warning"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Sales Overview</span>
                    <TrendingUp className="h-4 w-4 text-pharma-green" />
                  </CardTitle>
                  <CardDescription>
                    Monthly sales performance for the current year
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart
                      data={salesData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#4A90E2" fill="#4A90E2" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Activity</span>
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription>
                    Latest transactions and system alerts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSales.map((sale) => (
                      <div key={sale.id} className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            sale.status === 'completed' ? 'bg-pharma-green' : 'bg-pharma-orange'
                          }`} />
                          <div>
                            <p className="text-sm font-medium">{sale.customer}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {sale.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${sale.amount.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">{sale.items} items</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      View All Transactions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                  <CardDescription>
                    Sales and inventory levels by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart
                      data={categoryData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="#4A90E2" />
                      <Bar dataKey="stock" fill="#50C878" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Low Stock Alert</span>
                    <Pill className="h-4 w-4 text-pharma-red" />
                  </CardTitle>
                  <CardDescription>
                    Medicines that need to be restocked soon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b py-2 px-4 font-medium text-sm">
                      <div className="col-span-6">Medicine</div>
                      <div className="col-span-3">Category</div>
                      <div className="col-span-3 text-right">Stock</div>
                    </div>
                    <div className="divide-y">
                      {lowStockItems.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 py-3 px-4 text-sm">
                          <div className="col-span-6 font-medium">{item.name}</div>
                          <div className="col-span-3">{item.category}</div>
                          <div className="col-span-3 text-right">
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-pharma-red/10 text-pharma-red">
                              {item.stock} left
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View All Low Stock Items
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Detailed sales and inventory analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Analytics content will be implemented in the next phase.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>
                  Generate and view various reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Reports module will be implemented in the next phase.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
