import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Users, Eye, TrendingUp, Download, ArrowUpRight } from 'lucide-react';

const StatCard = ({ title, value, icon, trend, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-card border border-subtle p-6 rounded-xl flex items-start justify-between"
  >
    <div>
      <p className="text-muted text-sm font-semibold mb-2">{title}</p>
      <h3 className="text-3xl font-heading tracking-wider">{value}</h3>
      <p className="text-primary text-sm mt-2 flex items-center">
        <ArrowUpRight size={16} className="mr-1" /> {trend} this month
      </p>
    </div>
    <div className="p-3 bg-primary/10 rounded-lg text-primary">
      {icon}
    </div>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading mb-1">Dashboard Overview</h1>
          <p className="text-muted">Welcome back to the {"{{CLINIC_NAME}}"} Manufacturing CMS.</p>
        </div>
        <button className="btn btn-primary flex items-center">
          <Download size={18} className="mr-2" /> Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Inquiries" value="2,450" icon={<ShoppingBag size={24} />} trend="+12.5%" delay={0.1} />
        <StatCard title="Quotation Requests" value="384" icon={<Users size={24} />} trend="+8.2%" delay={0.2} />
        <StatCard title="Website Visitors" value="45.2K" icon={<Eye size={24} />} trend="+24.5%" delay={0.3} />
        <StatCard title="Conversion Rate" value="4.8%" icon={<TrendingUp size={24} />} trend="+1.2%" delay={0.4} />
      </div>

      {/* Recent Activities & Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Leads Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-card border border-subtle rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-subtle flex justify-between items-center">
            <h3 className="font-heading text-lg uppercase tracking-wide">Recent Inquiries</h3>
            <button className="text-primary text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-dark text-muted text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle">
                {[
                  { name: 'Apex Manufacturing', product: 'Industrial Chiller XL', status: 'New', date: 'Today, 10:45 AM' },
                  { name: 'Global Foods Inc', product: 'Commercial Dough Kneader', status: 'Contacted', date: 'Yesterday, 3:20 PM' },
                  { name: 'TechBuild Corp', product: 'Packaging Line', status: 'Quotation Sent', date: 'Oct 14, 2026' },
                  { name: 'Premium Hotels Group', product: 'Gas Range Setup', status: 'Converted', date: 'Oct 12, 2026' }
                ].map((lead, idx) => (
                  <tr key={idx} className="hover:bg-dark/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{lead.name}</td>
                    <td className="px-6 py-4 text-muted">{lead.product}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        lead.status === 'New' ? 'bg-blue-500/20 text-blue-400' :
                        lead.status === 'Contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                        lead.status === 'Quotation Sent' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted text-sm">{lead.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* System Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-subtle rounded-xl"
        >
          <div className="p-6 border-b border-subtle">
            <h3 className="font-heading text-lg uppercase tracking-wide">System Activity</h3>
          </div>
          <div className="p-6 space-y-6">
            {[
              { text: 'Product brochure updated: "Cooling Systems 2026"', time: '2 hours ago' },
              { text: 'New manufacturing process video uploaded', time: '5 hours ago' },
              { text: 'Database backup completed successfully', time: '12 hours ago' },
              { text: 'Admin settings modified by SuperAdmin', time: '1 day ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex relative">
                {idx !== 3 && <div className="absolute left-2.5 top-8 bottom-[-24px] w-[1px] bg-subtle"></div>}
                <div className="w-5 h-5 rounded-full bg-primary/20 border-2 border-primary shrink-0 mr-4 z-10 mt-1"></div>
                <div>
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
