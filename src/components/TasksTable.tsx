// src/components/TasksTable.tsx

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit } from 'lucide-react';
import React from 'react';

// Define the interface for the task object
interface Task {
  id: string;
  title: string;
  client: string;
  status: 'outstanding' | 'in-progress' | 'completed';
  dueDate: string;
}

// Define the props interface for the component
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Task Title</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id} className="cursor-pointer hover:bg-gray-50" onClick={() => onTaskClick(task)}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>{task.client}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(task.status)}>
                {task.status.replace('-', ' ').toUpperCase()}
              </Badge>
            </TableCell>
            <TableCell>{task.dueDate}</TableCell>
            <TableCell className="text-right">
              <Eye className="h-4 w-4 inline-block text-slate-500 hover:text-slate-900" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TasksTable;