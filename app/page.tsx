"use client";

import React from "react";
import Link from "next/link";
import { Image, Video, Sliders, Scissors, Cloud } from "lucide-react";


const movePageDown = () => {
  window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
};


export default function home() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <section
        className="hero h-[700px] bg-cover bg-center flex flex-col items-start justify-start relative"
        style={{ backgroundImage: `url('/images/banner.png')` }}
      >
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer flex flex-col items-center space-y-2">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="animate-bounce"
              onClick={movePageDown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          ))}
        </div>
      </section>

    

      {/* Features Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-10">Our Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Link href="/social-share">
              <div className="card bg-base-200 shadow-lg cursor-pointer">
                <div className="card-body">
                  <Image className="w-16 h-16 text-primary mb-4 mx-auto" />
                  <h3 className="text-2xl font-bold mb-2">Image Transformation</h3>
                  <p className="text-gray-600">
                    Resize, crop, and optimize images to fit any platform or device.
                  </p>
                </div>
              </div>
            </Link>

            {/* Feature 2 */}
            <Link href="/video-upload">
              <div className="card bg-base-200 shadow-lg cursor-pointer">
                <div className="card-body">
                  <Video className="w-16 h-16 text-primary mb-4 mx-auto" />
                  <h3 className="text-2xl font-bold mb-2">Video Compression</h3>
                  <p className="text-gray-600">
                    Compress and optimize videos without sacrificing quality.
                  </p>
                </div>
              </div>
            </Link>

            {/* Feature 3 */}
            <Link href="/bg-removal">
              <div className="card bg-base-200 shadow-lg cursor-pointer">
                <div className="card-body">
                  <Scissors className="w-16 h-16 text-primary mb-4 mx-auto" />
                  <h3 className="text-2xl font-bold mb-2">Background Removal</h3>
                  <p className="text-gray-600">
                    Remove backgrounds from images seamlessly for stunning visuals.
                  </p>
                </div>
              </div>
            </Link>

            {/* Feature 4 */}
            <Link href="/grayscale-image">
              <div className="card bg-base-200 shadow-lg cursor-pointer">
                <div className="card-body">
                  <Sliders className="w-16 h-16 text-primary mb-4 mx-auto" />
                  <h3 className="text-2xl font-bold mb-2">Grayscale Conversion</h3>
                  <p className="text-gray-600">
                    Convert images to grayscale with high-quality results.
                  </p>
                </div>
              </div>
            </Link>

            {/* Feature 5 */}
            {/* Uncomment and update as needed */}
            {/* <Link href="/cloud-storage">
              <div className="card bg-base-200 shadow-lg cursor-pointer">
                <div className="card-body">
                  <Cloud className="w-16 h-16 text-primary mb-4 mx-auto" />
                  <h3 className="text-2xl font-bold mb-2">Cloud Storage</h3>
                  <p className="text-gray-600">
                    Store and manage your media assets securely in the cloud.
                  </p>
                </div>
              </div>
            </Link> */}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Us Today</h2>
          <p className="text-xl mb-8">
            Start enhancing your media assets with our powerful cloud tools.
          </p>
          <Link href="/sign-up">
            <button className="btn btn-lg btn-secondary">
              Start Your Free Trial Today
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Skilled GURU AI. All rights
            reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy">
              <button className="link link-hover text-gray-600">
                Privacy Policy
              </button>
            </Link>
            <Link href="/terms-of-service">
              <button className="link link-hover text-gray-600">
                Terms of Service
              </button>
            </Link>
            <Link href="/contact-us">
              <button className="link link-hover text-gray-600">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
