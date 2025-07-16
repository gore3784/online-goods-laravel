import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, UserCheck, UserX } from 'lucide-react';
import { User } from '@/types';

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@email.com',
    full_name: 'John Doe',
    phone: '081234567890',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'jane.smith@email.com',
    full_name: 'Jane Smith',
    phone: '081234567891',
    created_at: '2024-01-16T14:20:00Z'
  },
  {
    id: '3',
    email: 'bob.johnson@email.com',
    full_name: 'Bob Johnson',
    phone: '081234567892',
    created_at: '2024-01-17T09:15:00Z'
  },
  {
    id: '4',
    email: 'alice.brown@email.com',
    full_name: 'Alice Brown',
    phone: '081234567893',
    created_at: '2024-01-18T16:45:00Z'
  },
  {
    id: '5',
    email: 'charlie.wilson@email.com',
    full_name: 'Charlie Wilson',
    phone: '081234567894',
    created_at: '2024-01-19T11:30:00Z'
  }
];

interface UserWithStats extends User {
  orders_count: number;
  total_spent: number;
  status: 'active' | 'inactive';
}

export const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Add mock stats to users
  const usersWithStats: UserWithStats[] = mockUsers.map((user, index) => ({
    ...user,
    orders_count: Math.floor(Math.random() * 10) + 1,
    total_spent: Math.floor(Math.random() * 10000000) + 500000,
    status: Math.random() > 0.2 ? 'active' : 'inactive'
  }));

  const filteredUsers = usersWithStats.filter(user =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.includes(searchTerm)
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: 'active' | 'inactive') => {
    return status === 'active' 
      ? <Badge variant="default">Active</Badge>
      : <Badge variant="secondary">Inactive</Badge>;
  };

  const totalUsers = usersWithStats.length;
  const activeUsers = usersWithStats.filter(u => u.status === 'active').length;
  const totalRevenue = usersWithStats.reduce((sum, user) => sum + user.total_spent, 0);
  const totalOrders = usersWithStats.reduce((sum, user) => sum + user.orders_count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage customer accounts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <UserCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <UserCheck className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.full_name || 'N/A'}</p>
                      <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || 'N/A'}</TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.orders_count} orders</Badge>
                  </TableCell>
                  <TableCell>{formatPrice(user.total_spent)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <UserCheck className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <UserX className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};