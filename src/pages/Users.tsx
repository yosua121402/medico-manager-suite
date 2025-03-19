
import { useEffect, Suspense } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { UserManagement } from '@/components/dashboard/UserManagement';
import { Skeleton } from '@/components/ui/skeleton';

// Loading component for the user management section
const UserLoader = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-9 w-24" />
    </div>
    <Skeleton className="h-12 w-full" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-48 w-full rounded-md" />
      ))}
    </div>
  </div>
);

const Users = () => {
  useEffect(() => {
    document.title = 'User Management - PharmAdmin';
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-display font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage all users and their access permissions.
          </p>
        </div>
        
        <Suspense fallback={<UserLoader />}>
          <UserManagement />
        </Suspense>
      </div>
    </DashboardLayout>
  );
};

export default Users;
