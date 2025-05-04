import AddProductLayer from "@/components/AddProductLayer";
import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "Add Product | Admin Panel - Rranzom Fragrances",
  description:
    "Manage and organize products efficiently in the Rranzom Fragrances admin dashboard. Add, edit, or remove items with ease and control.",
};


const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Add Product' />

        {/* AddProductLayer */}
        <AddProductLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
