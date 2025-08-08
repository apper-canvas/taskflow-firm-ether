import { motion } from "framer-motion";

const Loading = ({ type = "default" }) => {
  if (type === "skeleton") {
    return (
      <div className="space-y-4 p-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-white rounded-lg p-4 shadow-card animate-pulse">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </div>
              </div>
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "spinner") {
    return (
      <div className="flex items-center justify-center p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-3 border-primary-200 border-t-primary-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full mx-auto mb-4"
        />
        <p className="text-gray-600 font-medium">Loading tasks...</p>
      </motion.div>
    </div>
  );
};

export default Loading;