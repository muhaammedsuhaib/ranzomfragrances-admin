import PluginInit from "@/helper/PluginInit";
import "./font.css";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Ranzom Fragrances - E-commerce Admin Dashboard",
  description:
    "Ranzom Fragrances Admin Panel is a clean, powerful dashboard designed for managing e-commerce operations, including products, orders, staff, and analytics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PluginInit />
      <body suppressHydrationWarning={true}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}
