import React from "react";
import brandLogo from "../../assets/Brand/anvi-logo.png";
import locationIcon from "../../assets/icons/locationIcon.svg";
import instagramIcon from "../../assets/icons/instagramIcon.svg";
import facebookIcon from "../../assets/icons/facebookIcon.svg";
import whatsappIcon from "../../assets/icons/whatsappIcon.svg";
import emailIcon from "../../assets/icons/mailicon.svg";
import phoneIcon from "../../assets/icons/phoneIcon.svg";
// Social media icons using Unicode emojis (you can replace with SVG icons later)
const socialIcons = {
  instagram: instagramIcon,
  facebook: facebookIcon,
  whatsapp: whatsappIcon,
};

const Footer: React.FC = () => {
  const handleSocialClick = (platform: string) => {
    // Add your social media links here
    const socialLinks = {
      instagram: "https://www.instagram.com/anvifreshmart?igsh=MW9iamVpeWFsMDF6",
      facebook: "https://www.facebook.com/share/16JUTBpLnY/?mibextid=wwXIfr",
      whatsapp: "https://wa.me/919160904040", 
    };
    
    if (socialLinks[platform as keyof typeof socialLinks]) {
      window.open(socialLinks[platform as keyof typeof socialLinks], "_blank");
    }
  };

  return (
    <footer className="bg-[#20263e] text-white mt-auto">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1">
              <div className="flex flex-col items-start">
                <img
                  src={brandLogo}
                  alt="Aanvi Mart Logo"
                  className="w-24 h-auto mb-4"
                />
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your trusted source for fresh meat and groceries. Quality products delivered to your doorstep.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-[#920000]">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <img src={emailIcon} alt="email" className="w-4 h-4 mt-1" />
                  <div>
                    <p className="font-medium text-sm">Email</p>
                    <a 
                      href="mailto:anvifreshmeatmart4040@gmail.com" 
                      className="text-gray-300 text-sm hover:text-white transition-colors"
                    >
                      anvifreshmeatmart4040@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <img src={phoneIcon} alt="phone" className="w-4 h-4 mt-1" />
                  <div>
                    <p className="font-medium text-sm">Phone</p>
                    <a 
                      href="tel:+919160904040" 
                      className="text-gray-300 text-sm hover:text-white transition-colors"
                    >
                      +91 9160904040
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours Section */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-[#920000]">Opening Hours</h3>
              <div className="space-y-2">
                {[
                  { day: "Monday", hours: "6:00 AM - 10:00 PM" },
                  { day: "Tuesday", hours: "6:00 AM - 10:00 PM" },
                  { day: "Wednesday", hours: "6:00 AM - 10:00 PM" },
                  { day: "Thursday", hours: "6:00 AM - 10:00 PM" },
                  { day: "Friday", hours: "6:00 AM - 10:00 PM" },
                  { day: "Saturday", hours: "6:00 AM - 10:00 PM" },
                  { day: "Sunday", hours: "6:00 AM - 10:00 PM" },
                ].map((schedule) => (
                  <div key={schedule.day} className="flex justify-between text-sm">
                    <span className="text-gray-300">{schedule.day}</span>
                    <span className="text-gray-300">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Social Section */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-[#920000]">Visit Us</h3>
              <div className="space-y-4">
                <div className="flex  gap-3">
                  <img src={locationIcon} alt="location" className="w-4 h-4 mt-1" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    203, Street Number 4, Kalyan Nagar Phase 1, Siddarth Nagar, Kalyan Nagar, Sanjeeva Reddy Nagar, Hyderabad, Telangana 500038
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-3">Follow Us</h4>
                  <div className="flex gap-4">
                    {Object.entries(socialIcons).map(([platform, icon]) => (
                      <button
                        key={platform}
                        onClick={() => handleSocialClick(platform)}
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        aria-label={`Follow us on ${platform}`}
                      >
                        <img src={icon} alt={platform} className="w-7 h-7" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Layout */}
      <div className="hidden md:block lg:hidden">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Brand & Contact */}
            <div className="space-y-6">
              <div className="flex flex-col items-start">
                <img
                  src={brandLogo}
                  alt="Aanvi Mart Logo"
                  className="w-20 h-auto mb-3"
                />
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your trusted source for fresh meat and groceries.
                </p>
              </div>
              
              <div>
                <h3 className="text-base font-semibold mb-3 text-[#920000]">Contact Us</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <img src={emailIcon} alt="email" className="w-4 h-4 mt-1" />
                    <a 
                      href="mailto:anvifreshmeatmart4040@gmail.com" 
                      className="text-gray-300 text-sm hover:text-white transition-colors"
                    >
                      anvifreshmeatmart4040@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={phoneIcon} alt="phone" className="w-4 h-4 mt-1" />
                    <a 
                      href="tel:+919160904040" 
                      className="text-gray-300 text-sm hover:text-white transition-colors"
                    >
                      +91 9160904040
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours & Address */}
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold mb-3 text-[#920000]">Opening Hours</h3>
                <div className="space-y-1">
                  {[
                    { day: "Mon-Sun", hours: "6:00 AM - 10:00 PM" },
                  ].map((schedule) => (
                    <div key={schedule.day} className="flex justify-between text-sm">
                      <span className="text-gray-300">{schedule.day}</span>
                      <span className="text-gray-300">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-semibold mb-3 text-[#920000]">Address</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  203, Street Number 4, Kalyan Nagar Phase 1, Siddarth Nagar, Kalyan Nagar, Sanjeeva Reddy Nagar, Hyderabad, Telangana 500038
                </p>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Follow Us</h4>
                <div className="flex gap-3">
                  {Object.entries(socialIcons).map(([platform, icon]) => (
                    <button
                      key={platform}
                      onClick={() => handleSocialClick(platform)}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      aria-label={`Follow us on ${platform}`}
                    >
                      <img src={icon} alt={platform} className="w-7 h-7" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="px-4 py-6">
          <div className="space-y-6">
            {/* Brand */}
            <div className="flex flex-col items-center text-center">
              <img
                src={brandLogo}
                alt="Aanvi Mart Logo"
                className="w-16 h-auto mb-3"
              />
              <p className="text-gray-300 text-sm leading-relaxed">
                Your trusted source for fresh meat and groceries.
              </p>
            </div>

            {/* Contact */}
            <div className="text-center">
              <h3 className="text-base font-semibold mb-3 text-[#920000]">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <img src={emailIcon} alt="email" className="w-4 h-4 mt-1" />
                  <a 
                    href="mailto:anvifreshmeatmart4040@gmail.com" 
                    className="text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    anvifreshmeatmart4040@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <img src={phoneIcon} alt="phone" className="w-4 h-4 mt-1" />
                  <a 
                    href="tel:+91 91609 04040" 
                    className="text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    +91 91609 04040
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="text-center">
              <h3 className="text-base font-semibold mb-3 text-[#920000]">Opening Hours</h3>
              <div className="space-y-1">
                <div className="flex justify-center gap-4 text-sm">
                  <span className="text-gray-300">Mon-Sun</span>
                  <span className="text-gray-300">6:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="text-center">
              <h3 className="text-base font-semibold mb-3 text-[#920000]">Address</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                203, Street Number 4, Kalyan Nagar Phase 1, Siddarth Nagar, Kalyan Nagar, Sanjeeva Reddy Nagar, Hyderabad, Telangana 500038
              </p>
            </div>

            {/* Social */}
            <div className="text-center">
              <h4 className="font-medium text-sm mb-3">Follow Us</h4>
              <div className="flex justify-center gap-4">
                {Object.entries(socialIcons).map(([platform, icon]) => (
                  <button
                    key={platform}
                    onClick={() => handleSocialClick(platform)}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    aria-label={`Follow us on ${platform}`}
                  >
                    <img src={icon} alt={platform} className="w-7 h-7" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Anvi Fresh Meat Mart. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 