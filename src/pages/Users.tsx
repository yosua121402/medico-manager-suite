
import { useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { UserManagement } from '@/components/dashboard/UserManagement';

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
        
        <UserManagement />
      </div>
    </DashboardLayout>
  );
};

export default Users;
