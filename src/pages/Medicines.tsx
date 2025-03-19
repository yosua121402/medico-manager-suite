
import { useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { MedicineManagement } from '@/components/dashboard/MedicineManagement';

const Medicines = () => {
  useEffect(() => {
    document.title = 'Medicine Management - PharmAdmin';
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-display font-bold tracking-tight">Medicine Management</h2>
          <p className="text-muted-foreground">
            Manage your medicines inventory and categories.
          </p>
        </div>
        
        <MedicineManagement />
      </div>
    </DashboardLayout>
  );
};

export default Medicines;
