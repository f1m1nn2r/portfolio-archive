import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/footer/index";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
