import { Card } from '@/components/Dashboard/Card';
import React from 'react';

export const SenderDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Sender Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Create New Shipment">
          <p className="text-gray-600">Start a new delivery process here.</p>
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Create Now</button>
        </Card>
        <Card title="Shipment History">
          <p className="text-gray-600">View all your past and ongoing shipments.</p>
        </Card>
      </div>
    </div>
  );
};