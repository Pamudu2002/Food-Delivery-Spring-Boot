
import React from 'react';
import { Package } from 'lucide-react';

const Orders = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" 
             style={{ backgroundColor: '#90C67C' }}>
          <Package className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Orders Management</h2>
        <p className="text-gray-600 mb-6">
          This section will contain order management functionality.
        </p>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-500 text-sm">
            🚧 Orders component is under development. 
            <br />
            Coming soon with features like:
          </p>
          <ul className="text-gray-600 text-sm mt-4 space-y-2">
            <li>• View all orders</li>
            <li>• Update order status</li>
            <li>• Order details and customer information</li>
            <li>• Order analytics and reports</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Orders;
