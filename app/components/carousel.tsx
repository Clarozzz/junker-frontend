"use client";

export default function Carousel() {
  return (
    <div className="container mx-auto mt-5">
      <div
        data-hs-carousel='{
"loadingClasses": "opacity-0",
"isAutoPlay": true
}'
        className="relative"
      >
        <div className="hs-carousel relative overflow-hidden w-full min-h-[200px] md:min-h-[400px] bg-white rounded-lg">
          <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
            <div className="hs-carousel-slide">
              <div className="flex justify-center h-full">
                <span className="self-center text-4xl transition duration-700">
                  <img
                    className="bg-cover bg-center bg-no-repeat w-full h-full"
                    src="https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/pexels-mikebirdy-136872%20(1).webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL3BleGVscy1taWtlYmlyZHktMTM2ODcyICgxKS53ZWJwIiwiaWF0IjoxNzI5NTUyMjY0LCJleHAiOjE3NjEwODgyNjR9.Hkgdyo8_qKwkGxpP7Z86_n0qCiV9aSK39QqLipc-D-Y&t=2024-10-21T23%3A10%3A46.692Z"
                    alt=""
                  />
                </span>
              </div>
            </div>
            <div className="hs-carousel-slide">
              <div className="flex justify-center h-full">
                <span className="self-center text-4xl transition duration-700">
                  <img
                    src="https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/pexels-mikebirdy-136872%20(1).webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL3BleGVscy1taWtlYmlyZHktMTM2ODcyICgxKS53ZWJwIiwiaWF0IjoxNzI5NTUyMjY0LCJleHAiOjE3NjEwODgyNjR9.Hkgdyo8_qKwkGxpP7Z86_n0qCiV9aSK39QqLipc-D-Y&t=2024-10-21T23%3A10%3A46.692Z"
                    alt=""
                  />
                </span>
              </div>
            </div>
            <div className="hs-carousel-slide">
              <div className="flex justify-center h-full">
                <span className="self-center text-4xl transition duration-700">
                  <img
                    src="https://wgsthklptjwlberpnsqy.supabase.co/storage/v1/object/sign/landing/pexels-mikebirdy-136872%20(1).webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsYW5kaW5nL3BleGVscy1taWtlYmlyZHktMTM2ODcyICgxKS53ZWJwIiwiaWF0IjoxNzI5NTUyMjY0LCJleHAiOjE3NjEwODgyNjR9.Hkgdyo8_qKwkGxpP7Z86_n0qCiV9aSK39QqLipc-D-Y&t=2024-10-21T23%3A10%3A46.692Z"
                    alt=""
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/[.1]"
        >
          <span className="text-2xl" aria-hidden="true">
            <svg
              className="flex-shrink-0 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          type="button"
          className="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/[.1]"
        >
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg
              className="flex-shrink-0 w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </button>

        <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2">
          <span className="hs-carousel-active:bg-sec hs-carousel-active:border-sec w-3 h-3 border border-gray-400 rounded-full cursor-pointer"></span>
          <span className="hs-carousel-active:bg-sec hs-carousel-active:border-sec w-3 h-3 border border-gray-400 rounded-full cursor-pointer"></span>
          <span className="hs-carousel-active:bg-sec hs-carousel-active:border-sec w-3 h-3 border border-gray-400 rounded-full cursor-pointer"></span>
        </div>
      </div>
    </div>
  );
}
