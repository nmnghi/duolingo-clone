import { redirect } from "next/navigation";
import ClientApp from "./clientapp"; // Import Client Component
import { getIsAdmin } from "@/lib/admin";

const AdminPage = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div>
      <ClientApp />
    </div>
  );
};

export default AdminPage;