
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import TasksTable from '@/components/TasksTable';
import TaskModal from '@/components/TaskModal';
import { mockTasks } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Filter } from 'lucide-react';

const Tasks = () => {
  const { user } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTasks = mockTasks.filter(task => 
    statusFilter === 'all' || task.status === statusFilter
  );

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskUpdate = (updatedTask: any) => {
    console.log('Task updated:', updatedTask);
    setIsTaskModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Tasks</h1>
              <p className="text-slate-600">Manage all project tasks</p>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6">
          {/* Filter */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-4">
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
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-slate-800">All Tasks</h3>
            </div>
            <TasksTable tasks={filteredTasks} onTaskClick={handleTaskClick} />
          </div>
        </main>
      </div>

      <TaskModal
        task={selectedTask}
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onUpdate={handleTaskUpdate}
      />
    </div>
  );
};

export default Tasks;
