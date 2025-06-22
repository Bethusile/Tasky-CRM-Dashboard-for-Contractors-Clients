
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, AlertCircle } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  taskCount: number;
  outstandingItems: string;
}

interface ClientModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (client: Client) => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ client, isOpen, onClose, onUpdate }) => {
  const [editedClient, setEditedClient] = useState<Client | null>(null);

  useEffect(() => {
    if (client) {
      setEditedClient({ ...client });
    }
  }, [client]);

  if (!client || !editedClient) return null;

  const handleSave = () => {
    onUpdate(editedClient);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Client Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Client Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4 text-teal-600" />
              Client Name
            </Label>
            <Input
              id="name"
              value={editedClient.name}
              onChange={(e) => setEditedClient({ ...editedClient, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-teal-600" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={editedClient.email}
              onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value })}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-teal-600" />
              Phone Number
            </Label>
            <Input
              id="phone"
              value={editedClient.phone}
              onChange={(e) => setEditedClient({ ...editedClient, phone: e.target.value })}
            />
          </div>

          {/* Outstanding Items */}
          <div className="space-y-2">
            <Label htmlFor="outstanding" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              Outstanding from Client
            </Label>
            <Textarea
              id="outstanding"
              value={editedClient.outstandingItems}
              onChange={(e) => setEditedClient({ ...editedClient, outstandingItems: e.target.value })}
              rows={4}
              placeholder="List what is still outstanding from the client (payments, documents, approvals, etc.)"
            />
          </div>

          {/* Task Count (Read-only) */}
          <div className="space-y-2">
            <Label>Total Tasks</Label>
            <div className="text-slate-600 bg-slate-50 p-3 rounded-lg">
              {editedClient.taskCount} tasks assigned
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientModal;
