
import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Users,
  Pill,
  Store,
  TruckIcon,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Pill, label: 'Medicines', path: '/medicines' },
  { icon: Store, label: 'Distributors', path: '/distributors' },
  { icon: ShoppingCart, label: 'Purchases', path: '/purchases' },
  { icon: CreditCard, label: 'Sales', path: '/sales' },
  { icon: TruckIcon, label: 'Shipping', path: '/shipping' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar for desktop */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Pill className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-display font-semibold">PharmAdmin</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden" 
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 py-4">
            <nav className="px-2 space-y-1">
              {sidebarItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-3 py-3 text-sm font-medium rounded-md transition-all
                    ${isActive 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    }
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </ScrollArea>

          <div className="p-4">
            <Button 
              variant="outline" 
              className="w-full justify-start text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent/50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-background border-b h-16 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="lg:hidden mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-display font-semibold hidden sm:block">
              {sidebarItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="search" 
                placeholder="Search..." 
                className="w-64 rounded-md border border-input bg-background py-2 pl-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
              />
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@pharmacy.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

export default DashboardLayout;
