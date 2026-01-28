import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
