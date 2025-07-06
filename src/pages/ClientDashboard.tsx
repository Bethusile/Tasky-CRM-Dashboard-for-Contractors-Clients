
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TaskModal from '@/components/TaskModal';
import { mockTasks } from '@/data/mockData';
import { LogOut, Filter } from 'lucide-react';

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const clientTasks = mockTasks.filter(task => 
    statusFilter === 'all' || task.status === statusFilter
  );

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'outstanding': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-teal-600">LMB Tradings</h1>
              <span className="ml-4 text-slate-600">Hi, {user?.name}</span>
            </div>
            <Button variant="outline" onClick={logout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Tasks</h2>
          <p className="text-slate-600">Track the progress of your projects with LMB Tradings</p>
        </div>

        {/* Filter */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Filter by status:</span>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="outstanding">Outstanding</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tasks Grid */}
        <div className="grid gap-4">
          {clientTasks.map((task) => (
            <Card 
              key={task.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{task.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">Started: </span>
                    <span className="text-slate-600">{task.contractorStartDate}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-slate-700">Due: </span>
                    <span className="text-slate-600">{task.dueDate}</span>
                  </div>
                </div>
                {task.outstandingFromClient !== 'None - Project completed' && (
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-orange-800 mb-1">Outstanding from you:</p>
                    <p className="text-sm text-orange-700">{task.outstandingFromClient}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {clientTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No tasks found for the selected filter.</p>
          </div>
        )}
      </main>

      <TaskModal
        task={selectedTask}
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onUpdate={(task) => console.log('Task viewed:', task)}
        isReadOnly={true}
      />
    </div>
  );
};

export default ClientDashboard;
