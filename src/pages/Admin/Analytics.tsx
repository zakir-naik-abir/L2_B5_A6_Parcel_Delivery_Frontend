import React from 'react';
import { UsersIcon, CircleStackIcon, BanknotesIcon, ClockIcon } from '@heroicons/react/24/outline';

import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { StatCard } from '@/components/Dashboard/StartCard';
import { Card } from '@/components/Dashboard/Card';

// Chart.js 
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Mock Data 
const userGrowthData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'New Users',
      data: [65, 59, 80, 81, 56, 55],
      fill: true,
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderColor: 'rgba(59, 130, 246, 1)',
    },
  ],
};

const roleDistributionData = {
  labels: ['Admins', 'Senders', 'Receivers'],
  datasets: [
    {
      data: [12, 150, 350],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const recentActivities = [
  { id: 1, user: 'Admin User', action: 'Created new sender', timestamp: '2 hours ago' },
  { id: 2, user: 'Super Admin', action: 'Updated system settings', timestamp: '5 hours ago' },
  { id: 3, user: 'Sender ABC', action: 'Created 5 new shipments', timestamp: '1 day ago' },
  { id: 4, user: 'Admin User 2', action: 'Disabled a receiver account', timestamp: '2 days ago' },
];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">System Analytics</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="512" icon={UsersIcon} trend="+5.2% from last month" trendColor="green" />
        <StatCard title="Total Shipments" value="1,280" icon={CircleStackIcon} trend="+12% from last month" trendColor="green" />
        <StatCard title="Revenue" value="$25,600" icon={BanknotesIcon} trend="-1.8% from last month" trendColor="red" />
        <StatCard title="Active Sessions" value="78" icon={ClockIcon} trend="+3 from last hour" trendColor="green" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Card title="User Growth Over Time">
            <Line data={userGrowthData} />
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card title="User Role Distribution">
            <Doughnut data={roleDistributionData} />
          </Card>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div>
        <Card title="Recent Activities">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">User</th>
                  <th className="p-4 font-semibold text-gray-600">Action</th>
                  <th className="p-4 font-semibold text-gray-600">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentActivities.map(activity => (
                  <tr key={activity.id}>
                    <td className="p-4 text-gray-700">{activity.user}</td>
                    <td className="p-4 text-gray-700">{activity.action}</td>
                    <td className="p-4 text-gray-500">{activity.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};