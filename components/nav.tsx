import { readUser } from "@/app/api/server";
import Navbar from "./navbar";
import { createClient } from "@/utils/supabase/server";

export default async function Nav() {
    const { data: { user } } = await readUser();

    if (!user) {
        return <Navbar userData={null} />;
    }

    const supabase = await createClient();

    const usuario = await supabase.from('usuarios').select('nombre, avatar_url').eq("id", user.id).single()

    if ( !usuario) {
        console.error("Error fetching user data");
        return <Navbar userData={null} />;
    }

    console.log(usuario.data)

    return <Navbar userData={usuario.data} />;
}
