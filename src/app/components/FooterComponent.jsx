import React from 'react';
import styles from '../styles/Footer.module.css';
import 'flowbite';

export default function FooterComponent() {
  return (
    <footer
      className={`${styles.footer} fixed inset-x-0 bottom-0 px-2 md:px-4 py-1 md:py-3 text-center bg-gray-800 text-white rounded-t-full shadow-xl z-50`}
    >
      <div>
        <h3 className="text-xs md:text-lg mb-1 md:mb-2 font-semibold">
          Developed by
        </h3>
        <ul className="flex justify-center items-center md:flex-col lg:flex-row flex-wrap space-x-2 md:space-x-0 md:space-y-1 xl:space-x-2 xl:space-y-0 text-xs md:text-base">
          <li className="flex items-center space-x-1">
            <span>Joao Murara</span>
            <a
              className="text-yellow-400 hover:text-yellow-300"
              href="https://www.linkedin.com/in/joao-murara/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li className="flex items-center space-x-1">
            <span>Rafael Feliciano</span>
            <a
              className="text-yellow-400 hover:text-yellow-300"
              href="https://www.linkedin.com/in/rafaelfelic"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
        <div className="mt-1">
          <p className="font-light text-[0.4rem] md:text-xs lg:text-sm">
            This application is for educational purposes only and not intended
            for commercial use. &copy;2023
          </p>
        </div>
      </div>
    </footer>
  );
}
