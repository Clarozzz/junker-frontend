import { readUser } from "@/app/api/login"
import Navbar from "./navbar"
import { getUser } from "@/app/api/usuarios"

export default async function Nav() {
    const { data: { user } } = await readUser()

    if (!user) {
        return <Navbar userData={null} />
    }

    const usuario = await getUser(user.id)

    if (!usuario) {
        console.error(usuario)
    }

    return (
        <Navbar userData={usuario} />
    )
}
