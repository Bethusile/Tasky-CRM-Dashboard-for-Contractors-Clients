
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  client: string;
  startDate: string;
  dueDate: string;
  status: 'outstanding' | 'in-progress' | 'completed';
  timeAllocation: string;
  personInCharge: string;
  progress: string;
  outstandingFromClient: string;
  contractorStartDate: string;
}

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  isReadOnly?: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onUpdate, isReadOnly = false }) => {
  const { user } = useAuth();
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);

  if (!task || !editedTask) return null;

  const handleSave = () => {
    onUpdate(editedTask);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'outstanding': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isContractor = user?.role === 'contractor';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Task Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            {isReadOnly || !isContractor ? (
              <h3 className="text-lg font-medium">{editedTask.title}</h3>
            ) : (
              <Input
                id="title"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              />
            )}
          </div>

          {/* Client and Contractor Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-slate-500" />
              <div>
                <div className="text-sm font-medium text-slate-700">Client:</div>
                <div className="text-sm text-slate-600">{editedTask.client}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-teal-600" />
              <div>
                <div className="text-sm font-medium text-slate-700">Contractor:</div>
                <div className="text-sm text-slate-600">LMB Tradings</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            {isReadOnly || !isContractor ? (
              <p className="text-slate-600 bg-slate-50 p-3 rounded-lg">{editedTask.description}</p>
            ) : (
              <Textarea
                id="description"
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                rows={4}
              />
            )}
          </div>

          {/* Dates and Time Allocation */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              <div>
                <div className="text-sm font-medium text-slate-700">Start Date</div>
                <div className="text-sm text-slate-600">{editedTask.startDate}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-500" />
              <div>
                <div className="text-sm font-medium text-slate-700">Due Date</div>
                <div className="text-sm text-slate-600">{editedTask.dueDate}</div>
              </div>
            </div>
            {isContractor && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-teal-600" />
                <div>
                  <div className="text-sm font-medium text-slate-700">Time Allocation</div>
                  <div className="text-sm text-slate-600">{editedTask.timeAllocation}</div>
                </div>
              </div>
            )}
          </div>

          {/* Contractor-specific fields */}
          {isContractor && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Person in Charge</Label>
                <p className="text-slate-600 mt-1">{editedTask.personInCharge}</p>
              </div>
              <div>
                <Label>Progress</Label>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full" 
                      style={{ width: editedTask.progress }}
                    ></div>
                  </div>
                  <span className="text-sm text-slate-600">{editedTask.progress}</span>
                </div>
              </div>
            </div>
          )}

          {/* Client-specific fields */}
          {!isContractor && (
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-teal-600 mt-1" />
                <div>
                  <div className="text-sm font-medium text-slate-700">Started by Contractor</div>
                  <div className="text-sm text-slate-600">{editedTask.contractorStartDate}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-orange-600 mt-1" />
                <div>
                  <div className="text-sm font-medium text-slate-700">Outstanding from You</div>
                  <div className="text-sm text-slate-600 bg-orange-50 p-2 rounded">{editedTask.outstandingFromClient}</div>
                </div>
              </div>
            </div>
          )}

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            {isReadOnly || !isContractor ? (
              <Badge className={getStatusColor(editedTask.status)}>
                {editedTask.status.replace('-', ' ').toUpperCase()}
              </Badge>
            ) : (
              <Select 
                value={editedTask.status} 
                onValueChange={(value) => setEditedTask({ ...editedTask, status: value as any })}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outstanding">Outstanding</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              {isReadOnly || !isContractor ? 'Close' : 'Cancel'}
            </Button>
            {!isReadOnly && isContractor && (
              <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
