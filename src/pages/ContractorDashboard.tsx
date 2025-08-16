
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import KPICards from '@/components/KPICards';
import ClientsTable from '@/components/ClientsTable';
import TasksTable from '@/components/TasksTable';
import TaskModal from '@/components/TaskModal';
import { mockClients, mockTasks } from '@/data/mockData';

const ContractorDashboard = () => {
  const { user } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // --- ADDED LOADING CHECK ---
  // If the user object is null, display a loading message instead of crashing
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-xl font-medium text-slate-700">Loading dashboard...</p>
      </div>
    );
  }
  // --- END OF LOADING CHECK ---

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
          <h1 className="text-2xl font-bold text-slate-800">
            {/* The user object is guaranteed to exist here, so no need for the '?' */}
            Welcome, {user.email}!
          </h1>
          <p className="text-slate-600">Here's what's happening with LMB Tradings projects today.</p>
        </header>

        <main className="flex-1 p-6 space-y-8">
          <KPICards />
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-slate-800">Recent Clients</h3>
              </div>
              <ClientsTable clients={mockClients.slice(0, 4)} />
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-slate-800">Active Tasks</h3>
              </div>
              <TasksTable tasks={mockTasks.slice(0, 4)} onTaskClick={handleTaskClick} />
            </div>
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

export default ContractorDashboard;
