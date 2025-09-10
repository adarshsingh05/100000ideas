"use client";

import {
  Lightbulb,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0F1F] border-t border-[#10B981]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center shadow-lg">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-light text-white tracking-wide">
                10000IDEAS
              </span>
            </div>
            <p className="text-[#A0AEC0] font-light tracking-wide mb-6 leading-relaxed">
              Follow us on social media
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#10B981]/20 hover:bg-[#10B981]/30 rounded-lg flex items-center justify-center transition-colors group"
              >
                <Facebook className="w-5 h-5 text-[#10B981] group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#10B981]/20 hover:bg-[#10B981]/30 rounded-lg flex items-center justify-center transition-colors group"
              >
                <Twitter className="w-5 h-5 text-[#10B981] group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#10B981]/20 hover:bg-[#10B981]/30 rounded-lg flex items-center justify-center transition-colors group"
              >
                <Youtube className="w-5 h-5 text-[#10B981] group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#10B981]/20 hover:bg-[#10B981]/30 rounded-lg flex items-center justify-center transition-colors group"
              >
                <Instagram className="w-5 h-5 text-[#10B981] group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#10B981]/20 hover:bg-[#10B981]/30 rounded-lg flex items-center justify-center transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-[#10B981] group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-light tracking-wide mb-4">
              CATEGORIES
            </h3>
            <ul className="space-y-2">
              {[
                "Technology",
                "Manufacturing",
                "For Women",
                "Fashion",
                "E-commerce",
              ].map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="text-[#A0AEC0] hover:text-[#10B981] transition-colors font-light tracking-wide text-sm"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-light tracking-wide mb-4">ABOUT</h3>
            <ul className="space-y-2">
              {[
                "Our Company",
                "Who We Are",
                "FAQ",
                "The Journal",
                "Reviews",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[#A0AEC0] hover:text-[#10B981] transition-colors font-light tracking-wide text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-white font-light tracking-wide mb-4">MORE</h3>
            <ul className="space-y-2">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Contact Us",
                "Careers",
                "News",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[#A0AEC0] hover:text-[#10B981] transition-colors font-light tracking-wide text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[#10B981]/20">
          <div className="bg-[#1E40AF]/10 border border-[#10B981]/20 rounded-lg p-6 backdrop-blur-sm">
            <h4 className="text-white font-light tracking-wide mb-3">
              DISCLAIMER:
            </h4>
            <p className="text-[#A0AEC0] font-light tracking-wide leading-relaxed text-sm">
              10000Ideas is only an intermediary offering its exchange of
              ideas...offers a platform to advertise products of seller for a
              subscriber (please seeked User concerning on its website and is
              not and cannot be a party to or any way be control or any dealing
              with transactions between the seller and the
              subscriber/purchaser...At this information...offers, subsidies,
              funding options, execution process on this website have been
              extended by various other holders of the respective intellectual
              property rights or their content of ideas does not and does not
              shall and any of them...that when these businesses involve any
              deposits or disqualifications between the subscriber/buyer/owner
              and the seller and any or all of both sellers or/and subscriber/
              shall swear the such deposits amount involving 10000 ideas or its
              parent companies in any manner any disclosure to disqualifications
              between the subscriber/buyer and the seller and both sellers and
              subscriber document shall swear the such deposits amount involving
              10000 ideas or its parent companies...
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[#10B981]/20 text-center">
          <p className="text-[#A0AEC0] font-light tracking-wide text-sm">
            © 2025 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

