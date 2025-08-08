import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import TaskListPage from "@/components/pages/TaskListPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Layout>
          <Routes>
            <Route path="/" element={<TaskListPage />} />
            <Route path="/category/:categoryName" element={<TaskListPage />} />
            <Route path="/priority/:priorityLevel" element={<TaskListPage />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="z-50"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;