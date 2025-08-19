import MyAccountSidebar from "./MyAccountSidebar";

const MyAccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        <MyAccountSidebar />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </section>
  );
};

export default MyAccountLayout;
