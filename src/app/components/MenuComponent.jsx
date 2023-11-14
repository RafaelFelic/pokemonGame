'use client';
import React from 'react';
import EasyLevel from './GameLevels/EasyLevel';
import MediumLevel from './GameLevels/MediumLevel';
import HardLevel from './GameLevels/HardLevel';
import styles from '../styles/Menu.module.css';
import 'flowbite';

export default function MenuComponent() {
  return (
    <div
      className={`${styles.menu} fixed inset-0 flex flex-col justify-evenly items-center w-9/10 max-w-[1200px] h-3/5 mx-auto my-auto`}
    >
      <h2 className={`${styles.h2} text-6xl text-blue-400`}>
        Choose your level
      </h2>
      <div className="flex justify-around w-full px-8">
        <EasyLevel />
        <MediumLevel />
        <HardLevel />
      </div>
    </div>
  );
}

// import React from 'react';
// import styles from '../styles/Menu.module.css';
// import 'flowbite';

// export default function MenuComponent() {
//   // Classe comum para os botões de nível
//   const levelButton =
//     'flex flex-col items-center justify-evenly text-gray-800 text-5xl w-96 h-96';

//   return (
//     <div
//       className={`${styles.menu} fixed inset-0 flex flex-col justify-between items-center w-9/10 max-w-[1200px] h-2/5 mx-auto my-auto`}
//     >
//       <h2 className={`${styles.h2} text-6xl text-blue-400`}>
//         Choose your level
//       </h2>
//       <div className="flex justify-around w-full px-8">
//         <div className={`${levelButton} bg-yellow-300 ${styles.levelBox}`}>
//           <h3>Easy</h3>
//           <img className="w-20" src="/img/pokeball.png" alt="Pokeball" />
//           <p className="text-2xl">4 cards</p>
//         </div>
//         <div className={`${levelButton} bg-blue-500 ${styles.levelBox}`}>
//           <h3>Medium</h3>
//           <div className="flex flex-row">
//             <img className="w-20" src="/img/pokeball.png" alt="Pokeball" />
//             <img className="w-20" src="/img/pokeball.png" alt="Pokeball" />
//           </div>
//           <p className="text-2xl">8 cards</p>
//         </div>
//         <div className={`${levelButton} bg-red-500 ${styles.levelBox}`}>
//           <h3>Hard</h3>
//           <div className="flex flex-row">
//             <img className="w-20" src="/img/pokeball.png" alt="Pokeball" />
//             <img className="w-20" src="/img/pokeball.png" alt="Pokeball" />
//             <img className="w-20" src="/img/pokeball.png" alt="Pokeball" />
//           </div>
//           <p className="text-2xl">16 cards</p>
//         </div>
//       </div>
//     </div>
//   );
// }
