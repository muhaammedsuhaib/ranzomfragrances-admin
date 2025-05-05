import Breadcrumb from "@/components/Breadcrumb";
import CategoryListLayer from "@/components/CategoryListLayer";
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "Category List | Admin Panel - Rranzom Fragrances",
  description:
    "Manage and organize category efficiently in the Rranzom Fragrances admin dashboard. Add, edit, or remove items with ease and control.",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Category List" />

        {/* CategoryListLayer */}
        <CategoryListLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
