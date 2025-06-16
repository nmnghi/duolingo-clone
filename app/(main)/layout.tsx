import Sidebar from "@/components/sidebar";
import MobileHeader from "@/components/mobile-header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">
          {children}
        </div>
      </main>
    </>
  );
}