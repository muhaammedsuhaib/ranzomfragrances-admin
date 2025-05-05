import Breadcrumb from "@/components/Breadcrumb";
import ProductListLayer from "@/components/ProductListLayer";
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "Product List | Admin Panel - Rranzom Fragrances",
  description:
    "Manage and organize products efficiently in the Rranzom Fragrances admin dashboard. Add, edit, or remove items with ease and control.",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Product List" />

        {/* UsersListLayer */}
        <ProductListLayer />
      </MasterLayout>
    </>
  );
};

export default Page;
