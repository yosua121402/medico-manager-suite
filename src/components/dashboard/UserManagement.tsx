
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Pencil, Trash2, Search } from 'lucide-react';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'pharmacist' | 'cashier' | 'owner';
  status: 'active' | 'inactive';
};

const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@pharmacy.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@pharmacy.com', role: 'pharmacist', status: 'active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@pharmacy.com', role: 'cashier', status: 'active' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@pharmacy.com', role: 'owner', status: 'inactive' },
  { id: 5, name: 'David Brown', email: 'david@pharmacy.com', role: 'pharmacist', status: 'active' },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'pharmacist',
    status: 'active',
  });
  
  const { toast } = useToast();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive",
      });
      return;
    }
    
    const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const user = { ...newUser, id } as User;
    
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'pharmacist', status: 'active' });
    setIsAddUserOpen(false);
    
    toast({
      title: "User Added",
      description: `${user.name} has been added successfully.`,
    });
  };

  const handleEditUser = () => {
    if (!editingUser) return;
    
    setUsers(users.map(user => 
      user.id === editingUser.id ? editingUser : user
    ));
    
    setEditingUser(null);
    
    toast({
      title: "User Updated",
      description: `${editingUser.name} has been updated successfully.`,
    });
  };

  const handleDeleteUser = (id: number) => {
    const userToDelete = users.find(user => user.id === id);
    
    setUsers(users.filter(user => user.id !== id));
    
    toast({
      title: "User Deleted",
      description: `${userToDelete?.name} has been deleted.`,
    });
  };

  const resetForm = () => {
    setNewUser({ name: '', email: '', role: 'pharmacist', status: 'active' });
    setEditingUser(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full sm:w-[300px]"
          />
        </div>
        
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="whitespace-nowrap">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new user account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="john@pharmacy.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value as User['role'] })}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="pharmacist">Pharmacist</SelectItem>
                    <SelectItem value="cashier">Cashier</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newUser.status}
                  onValueChange={(value) => setNewUser({ ...newUser, status: value as User['status'] })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                resetForm();
                setIsAddUserOpen(false);
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Edit User Dialog */}
        <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user details.
              </DialogDescription>
            </DialogHeader>
            {editingUser && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select
                    value={editingUser.role}
                    onValueChange={(value) => setEditingUser({ ...editingUser, role: value as User['role'] })}
                  >
                    <SelectTrigger id="edit-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="pharmacist">Pharmacist</SelectItem>
                      <SelectItem value="cashier">Cashier</SelectItem>
                      <SelectItem value="owner">Owner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingUser.status}
                    onValueChange={(value) => setEditingUser({ ...editingUser, status: value as User['status'] })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingUser(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditUser}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                      ${user.role === 'admin' ? 'bg-pharma-purple/10 text-pharma-purple' : 
                        user.role === 'pharmacist' ? 'bg-pharma-green/10 text-pharma-green' : 
                        user.role === 'cashier' ? 'bg-pharma-blue/10 text-pharma-blue' : 
                        'bg-pharma-orange/10 text-pharma-orange'}`
                    }>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                      ${user.status === 'active' ? 'bg-pharma-green/10 text-pharma-green' : 'bg-pharma-red/10 text-pharma-red'}`
                    }>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditingUser(user)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
