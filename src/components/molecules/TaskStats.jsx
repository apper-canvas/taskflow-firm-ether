import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const TaskStats = ({ 
  totalTasks = 0, 
  completedTasks = 0, 
  pendingTasks = 0, 
  overdueTasks = 0 
}) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: "CheckSquare",
      color: "text-primary-500",
      bg: "bg-primary-50"
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: "CheckCircle",
      color: "text-success-500",
      bg: "bg-success-50"
    },
    {
      label: "Pending",
      value: pendingTasks,
      icon: "Clock",
      color: "text-warning-500",
      bg: "bg-warning-50"
    },
    {
      label: "Overdue",
      value: overdueTasks,
      icon: "AlertCircle",
      color: "text-accent-500",
      bg: "bg-accent-50"
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-card border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-heading-sm font-semibold text-gray-800">Task Overview</h3>
        <div className="flex items-center gap-2">
          <div className="text-body-sm text-gray-600">Progress</div>
          <div className="text-heading-sm font-bold text-primary-500">{completionRate}%</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completionRate}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-gradient-to-r from-success-500 to-primary-500 h-2 rounded-full"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bg} rounded-lg p-3 text-center`}
          >
            <div className={`w-8 h-8 ${stat.color} mx-auto mb-2`}>
              <ApperIcon name={stat.icon} className="w-full h-full" />
            </div>
            <div className="text-heading-md font-bold text-gray-800">{stat.value}</div>
            <div className="text-body-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TaskStats;