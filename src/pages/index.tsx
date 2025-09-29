import Container from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import MediaModal from "@/components/ui/media-modal";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import {
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";
import VideoPlayer from "@/components/ui/video-player";

const aboutStats = [
  { label: "Years of experience", value: "5+" },
  { label: "Teams Led", value: "5+" },
  { label: "Industries sold into", value: "10+" },
  { label: "New Logos Closed", value: "200+" },
];

const projects = [
  {
    title: "Linkedin AI Sales Prospector",
    description: "Linkedin AI Prospector",
    image: "/assets/Prosp — Automate LinkedIn & E-Mail Outbound with AI - 12 September 2025 (1).webm",
    href: "https://www.spacebarr.agency",
  },
  {
    title: "Email",
    description: "AI Email Campaign Prospector",
    image: "/assets/Emailreal.webm",
    href: "https://www.spacebarr.agency",
  },
  {
    title: "Telegram",
    description: "Telegram AI Prospector",
    image: "/assets/telegram.webm",
    href: "https://www.spacebarr.agency",
  },
  {
    title: "AI Researcher",
    description: "AI Research Prospector (Creatives coming soon)",
    image: "/assets/SpacebarR.png",
    href: "https://www.spacebarr.agency",
  },
  {
    title: "This website",
    description: "Cold Call AI Tracker (Creatives coming soon)",
    image: "/assets/SpacebarR.png",
    href: "https://www.spacebarr.agency",
  },
];

const services = [
  {
    service: "Linkedin AI Sales Prospector",
    description:
      "Fully automated, hyper-personalised messaging & voice mail flows, based on the prospect's last posts, comments and activites.",
    icon: Code2,
  },
  {
    service: "AI Email Campaign Prospector",
    description:
      "Run fully automated, personalised e-mails based on the prospect's or company's latest acheivements, posts or news.",
    icon: Frame,
  },
  {
    service: "AI Research Prospector",
    description:
      "Acquire valuable data on what services your prospect is currently utilising through automated job listing scraping.",
    icon: SearchCheck,
  },
  {
    service: "Crypto Telegram AI messaging automation",
    description:
      "Run fully automated, personalised waterfall messaging based on the project's stock performance, funding or latest developments.",
    icon: MonitorSmartphone,
  },
  {
    service: "Cold Call AI Tracker",
    description:
      "Track, transcibe and visualise performance data at scale to minimise fiction between copywrite & calling sessions.",
    icon: Eye,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [, setCarouselApi] = useState<CarouselApi | null>(null);
  const [navFadeOut, setNavFadeOut] = useState<boolean>(false);




  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      if (!refScrollContainer.current) return;
      
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current,
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);


  return (
    <Container navFadeOut={navFadeOut}>
      <div ref={refScrollContainer}>
        <Gradient />
        
        {/* Media Modal */}
        <MediaModal 
          isOpen={!!selectedMedia}
          onClose={() => setSelectedMedia(null)}
          mediaUrl={selectedMedia ?? ""}
          title="Project Media"
        />

        {/* Scroll Expansion Hero Section */}
        <ScrollExpandMedia 
          title="Mass Messaging, Uniquely Personal."
          scrollToExpand="Scroll to expand"
          onExpansionChange={(scrollProgress) => setNavFadeOut(scrollProgress > 0)}
        >
        </ScrollExpandMedia>

        {/* About */}
        <section id="about" data-scroll-section className="relative z-10 bg-background">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="pt-8 mb-8 flex max-w-6xl flex-col justify-start space-y-10 bg-background"
          >
            <h2 className="py-16  pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
              I&apos;m Mukesh, an experienced Sales Hunter with a strong foundation in {" "}
              <Link
                href=""
                target=""
                className="underline"
              
              >
                Classic Enterprise Sales and Technical Fluency.
              </Link>{" "}
              I&apos;ve worked complex, long-cycle deals with decision-makers at major organizations, using traditional sales skills honed through hands-on experience. What sets me apart is how I blend that old-school sales grit with a background in IT and automation, making me highly productive and effective at engaging new prospects.
              
            </h2>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.filter((stat): stat is NonNullable<typeof stat> => Boolean(stat)).map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Loom Video Section */}
        <section className="py-16 md:py-24 bg-background relative z-10" data-scroll-section>
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Winning with AI When Everyone&apos;s Doing It
              </h2>
            </div>
            
            {/* Custom Video Player */}
            <VideoPlayer 
              src="/assets/outbound-sales-video.mp4"
              subtitles="/assets/outbound-sales-video.srt"
              title="Winning with AI When Everyone's Doing It"
            />
            
            {/* Bottom descriptive text */}
            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Showcasing deep data-driven personalization that your competitors cannot replicate.
              </p>
            </div>
          </div>
        </section>

        {/* Powerslides Section */}
        <section className="py-16 md:py-24 bg-background relative z-10" data-scroll-section>
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Short on time? here are the slides
              </h2>
            </div>
            
            {/* Interactive Presentation Container */}
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              
              {/* Left Navigation Arrow */}
              <motion.div
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ 
                  x: [-5, 5, -5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.div>
              
              {/* Right Navigation Arrow */}
              <motion.div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ 
                  x: [5, -5, 5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
              
              {/* Progress Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {Array.from({length: 5}).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-white/50 rounded-full"
                    animate={{
                      backgroundColor: i === 0 ? "#ffffff" : "#ffffff80",
                      scale: i === 0 ? 1.2 : 1
                    }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
              
              {/* Canva Powerslides Embed with Hover Effect */}
              <motion.div 
                className="relative cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: 0, 
                  paddingTop: '56.2500%', 
                  paddingBottom: 0, 
                  boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', 
                  marginTop: '1.6em', 
                  marginBottom: '0.9em', 
                  overflow: 'hidden', 
                  borderRadius: '8px', 
                  willChange: 'transform' 
                }}
              >
                <iframe 
                  loading="lazy" 
                  style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
                  src="https://www.canva.com/design/DAGqrJoM_EU/51Oy8SKOIakbiVsM95QzJw/view?embed" 
                  allowFullScreen 
                  allow="fullscreen"
                  title="Prospect's Online Activity AI Outreach Automation Deck"
                />
                
                {/* Interactive Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            </motion.div>
            
            {/* Enhanced Instructions */}
            <motion.div 
              className="text-center mt-6 space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Use</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">←</kbd>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">→</kbd>
                <span>or click to navigate</span>
              </div>
            </motion.div>
            
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section className="relative z-10 bg-background">
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="pt-8 mb-12">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Not sure how sales can be technical?
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Here are some of my passion projects that I worked on during my weekends to maximise my sales productivity during selling hours.
            </p>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel 
                setApi={setCarouselApi} 
                className="w-full"
                opts={{
                  align: "start",
                  loop: false,
                  skipSnaps: false,
                  dragFree: true,
                }}
              >
                <CarouselContent className="[&>*]:hover:cursor-grab [&>*]:active:cursor-grabbing" style={{ scrollBehavior: 'smooth' }}>
                  {projects.map((project) => (
                    <CarouselItem key={project.title} className="md:basis-1/2">
                      <Card id="tilt">
                        <CardHeader className="p-0">
                          <div 
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              // Open media modal with the project's media file
                              setSelectedMedia(project.image);
                            }}
                          >
                            {project.image.endsWith(".webm") ? (
                              <video
                                src={project.image}
                                autoPlay
                                loop
                                muted
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            ) : (
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={600}
                                height={300}
                                quality={100}
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                            {project.description}
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold flex items-center justify-center gap-2">
                  Scroll for more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" data-scroll-section className="relative z-10 bg-background">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="pt-8 mb-12 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-stretch gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  AI Autopilot for outreach,
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    Personal touch after every response.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                </p>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start justify-between h-full rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <service.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
<section id="contact" data-scroll-section className="relative z-10 bg-background pt-8 mb-24">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Any{" "}
              <span className="text-gradient clash-grotesk">Questions?.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Ready to chat and exchange insights & ideas!
            </p>
            <Link href="mailto:Mukesh.Kalungan@gmail.com" passHref>
              <Button className="mt-6">Get in touch</Button>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
