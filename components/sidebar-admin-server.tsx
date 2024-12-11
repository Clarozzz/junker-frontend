// sidebar-server.ts (Server Component)
import { readUser } from "@/app/api/server";
import { createClient } from "@/utils/supabase/server";
import SidebarAdministrador from "./sidebar-admin";

export default async function SidebarAdminServer() {
    const { data: { user } } = await readUser();

    if (!user) {
        return <SidebarAdministrador userData={null} />;
    }

    const supabase = await createClient();

    const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('nombre, avatar_url, apellido')
        .eq("id", user.id)
        .single();

    if (error || !usuario) {
        console.error("Error fetching user data", error);
        return <SidebarAdministrador userData={null} />;
    }

    return <SidebarAdministrador userData={usuario} />;
}