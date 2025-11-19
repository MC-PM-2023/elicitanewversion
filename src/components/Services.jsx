// import React from "react"

// export default function Services() {
//     return (
//       <div className="bg-gray-900 py-24 sm:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <h2 className="text-center text-lg/8 font-semibold text-white">Our Apps </h2>
//           <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
           
//           <a
//       href="http://34.180.7.64:9000/"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//             <img
//               alt="elicita 2.0"
//               src="https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Elicata2.0.gif"
//               width={158}
//               height={48}
//               className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
//             />
//       </a>
//       <a
//       href="http://34.93.131.169/"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//             <img
//               alt="Analytica"
//               src="https://storage.googleapis.com/my-react-image-bucket-123/Analytica.gif"
//               width={158}
//               height={48}
//               className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
//             />
//             </a>
//             <a
//       href="http://34.47.202.92:7090/"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//             <img
//               alt="dsfileshare"
//               src="https://storage.googleapis.com/my-react-image-bucket-123/DSFileShare.gif"
//               width={158}
//               height={48}
//               className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
//             />
//   </a>
//   <a
//       href="http://34.14.182.209:7060/"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//             <img
//               alt="logsy"
//               src="https://storage.googleapis.com/my-react-image-bucket-123/Logsy.gif"
//               width={158}
//               height={48}
//               className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
//             />
//             </a>
//      <a
//       href="https://script.google.com/a/macros/datasolve-analytics.com/s/AKfycbyudbNWG8WThN3okAhFRZxLi0UjiGzlRFopKosW3KJRRImFvB6CJqvU2Au06Ew2OtKo5w/exec"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//             <img
//               alt="fynback"
//               src="https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Fynback.gif"
//               width={158}
//               height={48}
//               className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
//             />
// </a>
// <a
//       href="http://34.59.65.120/"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//             <img
//               alt="prioriq"
//               src="https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/PriorIQ.gif"
//               width={158}
//               height={48}
//               className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
//             />
// </a>
//           </div>
//         </div>
//       </div>
//     )
//   }
  

import React from "react";
import Analytica from '../assets/icons/Analytica.png'
// import dsfileshare from '../assets/icons/.png'
import elicitaicon from '../assets/icons/Elicita.png'
import logsy from '../assets/icons/Logsy.png'
import Fynback from '../assets/icons/Fynback.png'
import prior from '../assets/icons/PriorIQ.png'

export default function Services() {
  const apps = [
    // {
    //   name: "Elicita",
    //   src: {elicitaicon},
    //   href: "http://34.180.7.64:9000/",
    // },
    {
      name: "Analytica",
      src: Analytica,
      href: "http://34.93.131.169/",
    },
    {
      name: "DS FileShare",
      src: "https://storage.googleapis.com/my-react-image-bucket-123/DSFileShare.gif",
      href: "http://34.47.202.92:7090/",
    },
    {
      name: "Logsy",
      src:logsy,
      href: "http://34.14.182.209:7060/",
    },
    {
      name: "Fynback",
      src: Fynback,
      href: "https://script.google.com/a/macros/datasolve-analytics.com/s/AKfycbyudbNWG8WThN3okAhFRZxLi0UjiGzlRFopKosW3KJRRImFvB6CJqvU2Au06Ew2OtKo5w/exec",
    },
    {
      name: "PriorIQ",
      src: prior,
      href: "http://34.59.65.120/",
    },
  ];

  return (
    <section className="bg-rose-450 py-24 sm:py-32 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
        Built for You
        </h2>
        <p className="mt-3 text-gray-600 font-bold">
          Explore our suite of modern data solutions
        </p>

        <div className="mx-auto mt-10 grid grid-cols-2 gap-x-12 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center rounded-xl  p-4 "
            >
              <img
                src={app.src}
                title={app.name}
               style={{width:150, height:150}}
                className="h-16 w-auto object-contain rounded-[10px] transition-transform duration-300 group-hover:scale-105"
              />
              {/* <p className="mt-4 text-sm font-medium text-gray-300 group-hover:text-white">
                {app.name}
              </p> */}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
