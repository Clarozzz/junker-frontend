'use client'

const people = [
  {
    name: 'Miriam Velazquez',
    role: 'Marketing',
    imageUrl:
      'https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/marketing.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL21hcmtldGluZy53ZWJwIiwiaWF0IjoxNzI5NjM1NTkxLCJleHAiOjE3NjExNzE1OTF9.SS1CzB7ZetwfB4IO33FI7PpYF_al3laGqSYGENvnVsM&t=2024-10-22T22%3A19%3A33.013Z'
  },
  {
    name: 'Miguel Rodriguez',
    role: 'Mecanico',
    imageUrl:
      'https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/mecanico.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL21lY2FuaWNvLndlYnAiLCJpYXQiOjE3Mjk2MzU1MjMsImV4cCI6MTc2MTE3MTUyM30.N-ZB0FFWeoUb-Da6PfyY_RAXrF8ufqt0M-KtI57ULwI&t=2024-10-22T22%3A18%3A24.712Z'
  },
  {
    name: 'Alexander fernandez',
    role: 'Vendedor',
    imageUrl:
      'https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/vendedor.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL3ZlbmRlZG9yLndlYnAiLCJpYXQiOjE3Mjk2MzU1NjUsImV4cCI6MTc2MTE3MTU2NX0.7OSTCAuC0tz9wsEXHHaV0je6GVNqacVtW8WB0bDRCl0&t=2024-10-22T22%3A19%3A06.691Z'
  }
]

export default function Testimonios () {
  return (
    <section className="container mx-auto py-12 animate-scroll-fade-up" id="doctores">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight montserrat text-custom-blue sm:text-4xl">
            Nuestro Equipo
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
