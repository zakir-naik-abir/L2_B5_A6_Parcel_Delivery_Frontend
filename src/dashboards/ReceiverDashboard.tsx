import { Card } from '@/components/Dashboard/Card';
import React from 'react';

export const ReceiverDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Receiver Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Track a Package">
          <p className="text-gray-600">Enter your tracking ID to see package status.</p>
          <input type="text" placeholder="Tracking ID" className="mt-4 w-full p-2 border rounded-md"/>
        </Card>
        <Card title="Received Packages">
          <p className="text-gray-600">History of all packages you have received.</p>
        </Card>
      </div>
    </div>
  );
};