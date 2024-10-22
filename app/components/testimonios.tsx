'use client'

const people = [
  {
    name: 'Miriam Velazquez',
    role: 'Proveedor',
    imageUrl:
      'https://kvcvdthsaepnfxzhvtmy.supabase.co/storage/v1/object/public/imagenes/Doctores/25e53ed6-6d82-4d4c-89d9-72cf8e8165a2.webp'
  },
  {
    name: 'Miguel Rodriguez',
    role: 'Mecanico',
    imageUrl:
      'https://kvcvdthsaepnfxzhvtmy.supabase.co/storage/v1/object/public/imagenes/Doctores/6c69eb30-a0b3-4d38-b670-fed0d4aafb46.webp'
  },
  {
    name: 'Alexander fernandez',
    role: 'Vendedor',
    imageUrl:
      'https://kvcvdthsaepnfxzhvtmy.supabase.co/storage/v1/object/public/imagenes/Doctores/6e6fa6d3-69e4-4a9f-9a81-376894a4a372.webp'
  }
]

export default function Testimonios () {
  return (
    <section className="container mx-auto py-12 animate-scroll-fade-up" id="doctores">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
            Testimonios
          </h2>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt=""
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight ">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-sec dark:text-sec">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
