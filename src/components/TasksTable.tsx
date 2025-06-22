
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  client: string;
  dueDate: string;
  status: 'outstanding' | 'in-progress' | 'completed';
  timeAllocation: string;
  personInCharge: string;
  progress: string;
}

interface TasksTableProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const TasksTable: React.FC<TasksTableProps> = ({ tasks, onTaskClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'outstanding': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Task Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Client
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Due Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Time Allocation
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Person in Charge
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Progress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {tasks.map((task, index) => (
            <tr 
              key={task.id} 
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100 cursor-pointer`}
              onClick={() => onTaskClick(task)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-slate-900">{task.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                {task.client}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                {task.dueDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                {task.timeAllocation}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                {task.personInCharge}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full" 
                      style={{ width: task.progress }}
                    ></div>
                  </div>
                  <span className="text-sm text-slate-600">{task.progress}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className={getStatusColor(task.status)}>
                  {task.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onTaskClick(task); }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
