import React from 'react';
import 'flowbite';

export default function FooterComponent() {
  return (
    <footer className="fixed inset-x-0 bottom-0 p-5 text-center bg-gray-800 text-white rounded-t-full shadow-xl z-50">
      <div>
        <h3 className="mb-2.5">Collaborators</h3>
        <ul>
          <li className="my-1.5">
            <span>Joao Murara</span>
            <a
              className="ml-2.5 text-yellow-400"
              href="https://www.linkedin.com/in/joao-murara/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li className="my-1.5">
            <span>Rafael Feliciano</span>
            <a
              className="ml-2.5 text-yellow-400"
              href="https://www.linkedin.com/in/rafaelfelic"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
