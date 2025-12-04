import { logoFull, playStore } from "@/assets/images";

import { IconType } from "react-icons";
import {
  RiAppleLine,
  RiFacebookCircleFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiTwitterFill,
} from "react-icons/ri";
import { Button } from "../ui/button";
import Link from "next/link";
import { StaticImageData } from "next/image";

interface SocialIcons {
  title: string;
  icon: IconType;
  link: string;
}
interface FooterLinks {
  title: string;
  links: string[];
}

interface DownloadLinks {
  title: string;
  links: {
    label: string;
    icon?: IconType;
    image?: StaticImageData;
    url: string;
  }[];
}

const Footer = () => {
  const socialIcons: SocialIcons[] = [
    { title: "Facebook", icon: RiFacebookCircleFill, link: "" },
    { title: "Twitter", icon: RiTwitterFill, link: "" },
    { title: "Instagram", icon: RiInstagramLine, link: "" },
    { title: "LinkedIn", icon: RiLinkedinFill, link: "" },
  ];

  const footerLinks: FooterLinks[] = [
    {
      title: "Quick Links",
      links: [
        "Become a Partner / List Your Restaurant",
        "Become a Rider / Driver",
        "How It Works",
      ],
    },
    {
      title: "Customer Support",
      links: ["Help Center / FAQs", "Live Chat"],
    },
  ];

  const downloadLinks: DownloadLinks[] = [
    {
      title: "Download Apps",
      links: [
        {
          label: "Download on Google Play",
          image: playStore,
          url: "#",
        },
        {
          label: "Download on Apple Store",
          icon: RiAppleLine,
          url: "#",
        },
      ],
    },
  ];

  return (
    <footer className="bg-primary-50 ">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex gap-10 max-sm:flex-col justify-between pt-16">
          <div className="flex flex-col gap-10">
            {/* logo image */}
            <div className="w-[187px] h-[54px]">
              <img
                src={logoFull.src}
                alt="CargoLand Logo"
                className="size-full object-contain"
              />
            </div>
            <div className="flex gap-2">
              {socialIcons.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <div
                    className="size-10 rounded-full bg-primary flex justify-center items-center"
                    key={index}
                  >
                    <IconComponent className="text-white size-5" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer links */}
          <div className="flex-1 flex flex-wrap justify-between max-w-[720px]  pb-20">
            {footerLinks.map((links, index) => (
              <div className=" max-w-[178px] min-w-[147px] shrink" key={index}>
                <h4 className="text-xl font-medium">{links.title}</h4>
                <ul className="space-y-5 mt-5">
                  {links.links.map((link, index) => (
                    <li key={index} className="leading-5">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            .
            {downloadLinks.map((links, index) => (
              <div className="shrink" key={index}>
                <h4 className="text-xl font-medium">{links.title}</h4>
                <div className="flex flex-col gap-5 mt-5">
                  {links.links.map((link, index) => {
                    const IconComponent = link.icon!;
                    return (
                      <Link href={link.url} key={index}>
                        <Button className="bg-black w-full gap-2.5 text-white rounded-full p-4  ">
                          {link.image && (
                            <div className="size-4">
                              <img
                                src={link.image.src}
                                alt={link.label}
                                className="size-full object-cover"
                              />
                            </div>
                          )}
                          {link.icon && (
                            <IconComponent className="size-5 text-white" />
                          )}
                          <span>{link.label}</span>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pb-[66px] flex justify-between">
          <div className="flex gap-8 text-gray-400 text-xxs">
            <p className="">Terms of Service</p>
            <p className="">Privacy Policy</p>
            <p className="">Security</p>
          </div>
          <p className=" text-gray-400 text-xxs">
            &copy; {new Date().getFullYear()} Rayna. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
