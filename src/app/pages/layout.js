import Navbar from "../components/navbar";

export default function DashboardLayout({ children }) {
    return (
      <section>
        <Navbar />
        <div className="mt-8 p-4">
        {children}

        </div>
      </section>
    );
  }