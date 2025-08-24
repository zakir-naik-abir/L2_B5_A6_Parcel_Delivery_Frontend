import React, { type ElementType } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: ElementType;
  trend: string;
  trendColor: 'green' | 'red';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, trendColor }) => {
  const colorClass = trendColor === 'green' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className={`text-sm mt-1 ${colorClass}`}>{trend}</p>
      </div>
      <div className="bg-blue-100 p-3 rounded-full">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  );
};