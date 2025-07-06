
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import ClientModal from './ClientModal';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  taskCount: number;
  outstandingItems: string;
}

interface ClientsTableProps {
  clients: Client[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsClientModalOpen(true);
  };

  const handleClientUpdate = (updatedClient: Client) => {
    console.log('Client updated:', updatedClient);
    setIsClientModalOpen(false);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Client Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Tasks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Outstanding Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {clients.map((client, index) => (
              <tr key={client.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-slate-900">{client.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-600">{client.email}</div>
                  <div className="text-sm text-slate-500">{client.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="secondary">{client.taskCount} tasks</Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600 max-w-xs truncate" title={client.outstandingItems}>
                    {client.outstandingItems || 'None'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button size="sm" variant="outline" onClick={() => handleViewClient(client)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ClientModal
        client={selectedClient}
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onUpdate={handleClientUpdate}
      />
    </>
  );
};

export default ClientsTable;
