
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Pencil, Trash2, Search, Package, Filter } from 'lucide-react';

type Medicine = {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  description: string;
  expiryDate: string;
};

type Category = {
  id: number;
  name: string;
  description: string;
};

const mockMedicines: Medicine[] = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', stock: 145, price: 5.99, description: 'For pain and fever relief', expiryDate: '2025-05-23' },
  { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotics', stock: 75, price: 8.50, description: 'Antibiotic for bacterial infections', expiryDate: '2024-11-15' },
  { id: 3, name: 'Loratadine 10mg', category: 'Allergy', stock: 92, price: 6.75, description: 'Antihistamine for allergy relief', expiryDate: '2025-02-10' },
  { id: 4, name: 'Omeprazole 20mg', category: 'Gastrointestinal', stock: 110, price: 9.25, description: 'For acid reflux and ulcers', expiryDate: '2024-08-30' },
  { id: 5, name: 'Lisinopril 10mg', category: 'Cardiovascular', stock: 68, price: 12.50, description: 'ACE inhibitor for hypertension', expiryDate: '2025-03-15' },
];

const mockCategories: Category[] = [
  { id: 1, name: 'Pain Relief', description: 'Medicines for pain management' },
  { id: 2, name: 'Antibiotics', description: 'Medicines that kill or inhibit the growth of bacteria' },
  { id: 3, name: 'Allergy', description: 'Medicines for treating allergic reactions' },
  { id: 4, name: 'Gastrointestinal', description: 'Medicines for digestive system disorders' },
  { id: 5, name: 'Cardiovascular', description: 'Medicines for heart and blood vessel conditions' },
];

export function MedicineManagement() {
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isAddMedicineOpen, setIsAddMedicineOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newMedicine, setNewMedicine] = useState<Partial<Medicine>>({
    name: '',
    category: '',
    stock: 0,
    price: 0,
    description: '',
    expiryDate: '',
  });
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: '',
    description: '',
  });
  
  const { toast } = useToast();

  const filteredMedicines = medicines.filter(medicine => 
    (medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    medicine.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter ? medicine.category === categoryFilter : true)
  );

  const handleAddMedicine = () => {
    if (!newMedicine.name || !newMedicine.category) {
      toast({
        title: "Error",
        description: "Name and category are required",
        variant: "destructive",
      });
      return;
    }
    
    const id = medicines.length > 0 ? Math.max(...medicines.map(m => m.id)) + 1 : 1;
    const medicine = { ...newMedicine, id } as Medicine;
    
    setMedicines([...medicines, medicine]);
    setNewMedicine({ name: '', category: '', stock: 0, price: 0, description: '', expiryDate: '' });
    setIsAddMedicineOpen(false);
    
    toast({
      title: "Medicine Added",
      description: `${medicine.name} has been added successfully.`,
    });
  };

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }
    
    const id = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    const category = { ...newCategory, id } as Category;
    
    setCategories([...categories, category]);
    setNewCategory({ name: '', description: '' });
    setIsAddCategoryOpen(false);
    
    toast({
      title: "Category Added",
      description: `${category.name} has been added successfully.`,
    });
  };

  const handleEditMedicine = () => {
    if (!editingMedicine) return;
    
    setMedicines(medicines.map(medicine => 
      medicine.id === editingMedicine.id ? editingMedicine : medicine
    ));
    
    setEditingMedicine(null);
    
    toast({
      title: "Medicine Updated",
      description: `${editingMedicine.name} has been updated successfully.`,
    });
  };

  const handleEditCategory = () => {
    if (!editingCategory) return;
    
    setCategories(categories.map(category => 
      category.id === editingCategory.id ? editingCategory : category
    ));
    
    // Also update medicine categories if category name changed
    if (editingCategory) {
      const oldCategory = categories.find(c => c.id === editingCategory.id);
      if (oldCategory && oldCategory.name !== editingCategory.name) {
        setMedicines(medicines.map(medicine => 
          medicine.category === oldCategory.name 
            ? { ...medicine, category: editingCategory.name } 
            : medicine
        ));
      }
    }
    
    setEditingCategory(null);
    
    toast({
      title: "Category Updated",
      description: `Category has been updated successfully.`,
    });
  };

  const handleDeleteMedicine = (id: number) => {
    const medicineToDelete = medicines.find(medicine => medicine.id === id);
    
    setMedicines(medicines.filter(medicine => medicine.id !== id));
    
    toast({
      title: "Medicine Deleted",
      description: `${medicineToDelete?.name} has been deleted.`,
    });
  };

  const handleDeleteCategory = (id: number) => {
    const categoryToDelete = categories.find(category => category.id === id);
    
    // Check if any medicines are using this category
    const medicinesUsingCategory = medicines.filter(
      medicine => medicine.category === categoryToDelete?.name
    );
    
    if (medicinesUsingCategory.length > 0) {
      toast({
        title: "Cannot Delete Category",
        description: `There are ${medicinesUsingCategory.length} medicines using this category.`,
        variant: "destructive",
      });
      return;
    }
    
    setCategories(categories.filter(category => category.id !== id));
    
    toast({
      title: "Category Deleted",
      description: `${categoryToDelete?.name} has been deleted.`,
    });
  };

  const resetMedicineForm = () => {
    setNewMedicine({ name: '', category: '', stock: 0, price: 0, description: '', expiryDate: '' });
    setEditingMedicine(null);
  };

  const resetCategoryForm = () => {
    setNewCategory({ name: '', description: '' });
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="medicines" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="medicines">Medicines</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        {/* Medicines Tab */}
        <TabsContent value="medicines" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    {categoryFilter || "All Categories"}
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Dialog open={isAddMedicineOpen} onOpenChange={setIsAddMedicineOpen}>
              <DialogTrigger asChild>
                <Button className="whitespace-nowrap">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Medicine
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Add New Medicine</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new medicine to inventory.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Medicine Name</Label>
                      <Input
                        id="name"
                        value={newMedicine.name}
                        onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                        placeholder="Paracetamol 500mg"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newMedicine.category}
                        onValueChange={(value) => setNewMedicine({ ...newMedicine, category: value })}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="stock">Initial Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newMedicine.stock || ''}
                        onChange={(e) => setNewMedicine({ ...newMedicine, stock: Number(e.target.value) })}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newMedicine.price || ''}
                        onChange={(e) => setNewMedicine({ ...newMedicine, price: Number(e.target.value) })}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={newMedicine.expiryDate}
                      onChange={(e) => setNewMedicine({ ...newMedicine, expiryDate: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newMedicine.description}
                      onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })}
                      placeholder="Description of the medicine"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    resetMedicineForm();
                    setIsAddMedicineOpen(false);
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMedicine}>Add Medicine</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            {/* Edit Medicine Dialog */}
            <Dialog open={!!editingMedicine} onOpenChange={(open) => !open && setEditingMedicine(null)}>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Edit Medicine</DialogTitle>
                  <DialogDescription>
                    Update medicine details.
                  </DialogDescription>
                </DialogHeader>
                {editingMedicine && (
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-name">Medicine Name</Label>
                        <Input
                          id="edit-name"
                          value={editingMedicine.name}
                          onChange={(e) => setEditingMedicine({ ...editingMedicine, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-category">Category</Label>
                        <Select
                          value={editingMedicine.category}
                          onValueChange={(value) => setEditingMedicine({ ...editingMedicine, category: value })}
                        >
                          <SelectTrigger id="edit-category">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-stock">Stock</Label>
                        <Input
                          id="edit-stock"
                          type="number"
                          value={editingMedicine.stock}
                          onChange={(e) => setEditingMedicine({ ...editingMedicine, stock: Number(e.target.value) })}
                          min="0"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-price">Price</Label>
                        <Input
                          id="edit-price"
                          type="number"
                          value={editingMedicine.price}
                          onChange={(e) => setEditingMedicine({ ...editingMedicine, price: Number(e.target.value) })}
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="edit-expiry">Expiry Date</Label>
                      <Input
                        id="edit-expiry"
                        type="date"
                        value={editingMedicine.expiryDate}
                        onChange={(e) => setEditingMedicine({ ...editingMedicine, expiryDate: e.target.value })}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea
                        id="edit-description"
                        value={editingMedicine.description}
                        onChange={(e) => setEditingMedicine({ ...editingMedicine, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditingMedicine(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditMedicine}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="rounded-lg border shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedicines.length > 0 ? (
                  filteredMedicines.map((medicine) => (
                    <TableRow key={medicine.id}>
                      <TableCell className="font-medium">{medicine.name}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-pharma-blue/10 text-pharma-blue">
                          {medicine.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={medicine.stock < 20 ? 'text-pharma-red' : medicine.stock < 50 ? 'text-pharma-orange' : 'text-pharma-green'}>
                          {medicine.stock}
                        </span>
                      </TableCell>
                      <TableCell>${medicine.price.toFixed(2)}</TableCell>
                      <TableCell>{new Date(medicine.expiryDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setEditingMedicine(medicine)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteMedicine(medicine.id)}
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
                    <TableCell colSpan={6} className="h-24 text-center">
                      No medicines found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full sm:w-[300px]"
              />
            </div>
            
            <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
              <DialogTrigger asChild>
                <Button className="whitespace-nowrap">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Create a new medicine category.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category-name">Category Name</Label>
                    <Input
                      id="category-name"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      placeholder="Pain Relief"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category-description">Description</Label>
                    <Textarea
                      id="category-description"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                      placeholder="Description of the category"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    resetCategoryForm();
                    setIsAddCategoryOpen(false);
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCategory}>Add Category</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            {/* Edit Category Dialog */}
            <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Category</DialogTitle>
                  <DialogDescription>
                    Update category details.
                  </DialogDescription>
                </DialogHeader>
                {editingCategory && (
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-category-name">Category Name</Label>
                      <Input
                        id="edit-category-name"
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-category-description">Description</Label>
                      <Textarea
                        id="edit-category-description"
                        value={editingCategory.description}
                        onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditingCategory(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditCategory}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="rounded-lg border shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Medicine Count</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.filter(category => 
                  category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  category.description.toLowerCase().includes(searchTerm.toLowerCase())
                ).length > 0 ? (
                  categories
                    .filter(category => 
                      category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      category.description.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>
                          {medicines.filter(medicine => medicine.category === category.name).length}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setEditingCategory(category)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteCategory(category.id)}
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
                    <TableCell colSpan={4} className="h-24 text-center">
                      No categories found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
