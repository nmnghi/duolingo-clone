export default function MainLayout({children}: {children: React.ReactNode}) {
    return (
        <>
          {/* <MobileHeader />
          <SideBar className="hidden lg:flex" /> */}
          <main className="h-full  pt-[50px] lg:pl-[256px] lg:pt-0">
            <div className="mx-auto h-full max-w-[1065px] pt-6">{children}</div>
          </main>
        </>
      );
}