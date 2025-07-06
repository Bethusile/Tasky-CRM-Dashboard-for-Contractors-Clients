
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import ClientsTable from '@/components/ClientsTable';
import { mockClients } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Clients = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Clients</h1>
              <p className="text-slate-600">Manage your client relationships</p>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-slate-800">All Clients</h3>
            </div>
            <ClientsTable clients={mockClients} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Clients;
