import MasterLayout from "@/masterLayout/MasterLayout";
import { Breadcrumb } from "react-bootstrap";
import DashBoardLayerOne from "@/components/DashBoardLayerOne";
import AuthGuard from "@/components/AuthGuard";

export const metadata = {
  title: "Ranzom Fragrances - E-commerce Admin Dashboard",
  description:
    "Ranzom Fragrances Admin Panel is a clean, powerful dashboard designed for managing e-commerce operations, including products, orders, staff, and analytics.",
};

const Page = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="AI" />
      <AuthGuard>
        <DashBoardLayerOne />
      </AuthGuard>
    </MasterLayout>
  );
};

export default Page;
