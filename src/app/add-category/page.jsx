import AddCategoryLayer from "@/components/AddCategoryLayer";
import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "Add Category | Admin Panel - Rranzom Fragrances",
  description:
    "Manage and organize category efficiently in the Rranzom Fragrances admin dashboard. Add, edit, or remove items with ease and control.",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Add Category" />

        {/* AddCategoryLayer */}
        <AddCategoryLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
