import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { name: "All Tasks", href: "/", icon: "List", active: true },
    { name: "Today", href: "/today", icon: "Calendar" },
    { name: "Upcoming", href: "/upcoming", icon: "Clock" },
    { name: "Completed", href: "/completed", icon: "CheckCircle" },
    { name: "Categories", href: "/categories", icon: "Tag" },
    { name: "Analytics", href: "/analytics", icon: "BarChart3" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Mobile Sidebar */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: sidebarOpen ? "0%" : "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-md border-r border-white/20 shadow-xl lg:hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-heading-sm font-bold text-gray-800">TaskFlow</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-body-md transition-colors",
                  item.active 
                    ? "bg-primary-50 text-primary-700 font-medium" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <ApperIcon name={item.icon} className="w-5 h-5" />
                {item.name}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* Desktop Layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="w-72 bg-white/80 backdrop-blur-sm border-r border-white/20">
            <div className="flex items-center gap-3 p-6 border-b border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-md">
                <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-heading-md font-bold gradient-text">TaskFlow</h2>
                <p className="text-body-sm text-gray-600">Organize your day</p>
              </div>
            </div>
            
            <nav className="p-6 space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-body-md transition-all duration-200",
                    item.active 
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium shadow-md" 
                      : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                  )}
                >
                  <ApperIcon name={item.icon} className="w-5 h-5" />
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Quick Stats */}
            <div className="p-6 mt-auto border-t border-gray-200">
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4">
                <h3 className="text-body-sm font-semibold text-gray-700 mb-2">Quick Stats</h3>
                <div className="space-y-2 text-body-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Active Tasks</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed Today</span>
                    <span className="font-medium text-success-600">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overdue</span>
                    <span className="font-medium text-accent-600">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Mobile Header with Hamburger */}
          <div className="lg:hidden bg-white/90 backdrop-blur-md border-b border-white/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ApperIcon name="Menu" className="w-6 h-6 text-gray-600" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-heading-sm font-bold gradient-text">TaskFlow</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;