
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import KPICards from '@/components/KPICards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockTasks } from '@/data/mockData';
import { AlertTriangle, Calendar } from 'lucide-react';

const Reports = () => {
  const { user } = useAuth();

  const taskStatusData = [
    { name: 'Outstanding', value: 8, color: '#EF4444' },
    { name: 'In Progress', value: 12, color: '#F59E0B' },
    { name: 'Completed', value: 45, color: '#10B981' },
  ];

  const monthlyData = [
    { month: 'Jan', tasks: 12 },
    { month: 'Feb', tasks: 15 },
    { month: 'Mar', tasks: 18 },
    { month: 'Apr', tasks: 20 },
    { month: 'May', tasks: 16 },
    { month: 'Jun', tasks: 14 },
  ];

  // Calculate overdue tasks (assuming current date is after due date)
  const currentDate = new Date();
  const overdueTasks = mockTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return task.status !== 'completed' && dueDate < currentDate;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
          <p className="text-slate-600">Business insights and analytics</p>
        </header>

        <main className="flex-1 p-6 space-y-8">
          <KPICards />
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Task Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Task Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#2A9D8F" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Overdue Tasks Report */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Overdue Tasks Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              {overdueTasks.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p className="text-lg font-medium">No Overdue Tasks</p>
                  <p className="text-sm">All tasks are on schedule!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Task</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Client</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Due Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Days Overdue</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Person in Charge</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {overdueTasks.map((task, index) => {
                        const dueDate = new Date(task.dueDate);
                        const daysOverdue = Math.floor((currentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
                        
                        return (
                          <tr key={task.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="px-4 py-4">
                              <div className="font-medium text-slate-900">{task.title}</div>
                            </td>
                            <td className="px-4 py-4 text-slate-600">{task.client}</td>
                            <td className="px-4 py-4 text-slate-600">{task.dueDate}</td>
                            <td className="px-4 py-4">
                              <span className="text-red-600 font-medium">{daysOverdue} days</span>
                            </td>
                            <td className="px-4 py-4">
                              <Badge className={task.status === 'outstanding' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                                {task.status.replace('-', ' ').toUpperCase()}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 text-slate-600">{task.personInCharge}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Reports;
