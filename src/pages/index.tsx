import Container from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/ui/video-player";
import { ScrollVelocity } from "@/components/ui/scroll-velocity";
import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
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

const aboutStats = [
  { label: "Years of experience", value: "5+" },
  { label: "Teams Led", value: "5+" },
  { label: "Industries sold into", value: "10+" },
  { label: "New Logos Closed", value: "200+" },
  ,
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
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentCycle, setCurrentCycle] = useState(0);

  // All 40 personalized messages
  const allMessages = [
    "Melissa, your recent LinkedIn post about your Friday Tech Huddles at ByteLeap was inspiring. What topic are you thinking about exploring next for your team?",
    "Arjun, I read your Medium article where Atlas Fintech adopted an AI reconciliation tool in Q2. What did your team enjoy most about rolling it out?",
    "Ben, your candid comment on Devon Smith's Pulse Analytics dashboard announcement really got me thinking. What sort of early reactions have your clients shared so far?",
    "Sophie, I watched the behind-the-scenes video from Stellar Health's hackathon and loved it. How did your team come up with that patient triage mobile app?",
    "Rina, your panel insights during the Diversity in STEM webinar stuck with me, especially your story about mentoring interns at Springboard Labs. What recent program makes you proudest?",
    "Omar, I saw your Q and A on Reddit about switching to zero-based budgeting at GreenSprout Ventures. Which department found the transition easiest?",
    "Harpreet, I caught the UpSkill Weekly podcast you co-hosted with Priya Lee on hiring for technical roles. What challenge are you hoping to solve next in your process?",
    "Jenny, I noticed your CEO's Year In Review post for Mosaic Markets called out your amazing jump in client retention. Which tweak had the most impact?",
    "Nikhil, I appreciated your reply to Chris Tan's tweet about multi-cloud security challenges. What tools do you wish offered more flexibility?",
    "Charlene, your case study on migrating Craftly CRM's database sparked lots of discussions. Are more of your clients thinking of a stepwise migration these days?",
    "Miguel, I loved watching your Instagram reel from Habitat for Humanity's team build day. What did you enjoy most about volunteering?",
    "Anya, your thoughtful comment on GreenBay's ESG report and how it affects mid-market suppliers was spot on. What step comes next in your own ESG strategy?",
    "Sam, your teardown video on the onboarding flow for the First90 HR suite was filled with fresh ideas. Which feature are you most eager to see more startups adopt?",
    "Maya, your Slack AMA on launching the Women Who Scale mentorship match program seemed energizing for the group. What new features are you most excited to implement?",
    "Leo, I saw your notes on LinziAI's open source NLP library over on GitHub. What improvements are you hoping to see in the next release?",
    "Daniela, the viral TikTok your team made for BookNest's auto sync tool popped up on my feed this morning. Was there any scenario that proved trickier than expected?",
    "Vishal, your review in ProductSphere's newsletter about the Zeno board meeting platform was really helpful. If you could change one meeting format for your team, what would you choose?",
    "Emily, your comment on the Acme Studio roadmap thread about dark mode accessibility was so clear. Did the product team end up acting on your suggestion?",
    "Tai, I caught your YouTube Short about using corn starch packing for SafeBox's holiday orders. What packaging will you experiment with next?",
    "Grace, I tuned into your mental health roundtable for JavaJam's dev community and found the discussion refreshingly honest. What topic took you by surprise during that session?",
    "Kevin, that LinkedIn post you wrote about managing rapid growth at Veloz really hit home. What leadership habit has helped you stay grounded during the rush?",
    "Amanda, I caught your comment on Jade Tan's thread about hybrid work setups. What's been the biggest surprise for your team since making the switch?",
    "Marcus, I enjoyed your firm's blog about moving to cloud-based accounting. Which tool made the biggest difference to your workflow?",
    "Priya, your Instagram story from the wellness retreat last week looked restorative. What part of the program would you most recommend to others?",
    "Julian, your CEO's recent company update namedropped your team's success launching the BlueBird app. What challenge did you have to work hardest to overcome?",
    "Abby, I read your thoughtful reply on the ProductHive forum about user research interviews. How do you keep participants engaged during longer sessions?",
    "Rahul, your quick poll on X about preferred project management methods got me thinking. How did your own team decide on their approach?",
    "Rachel, your Facebook post celebrating your hundredth customer was fantastic. What's helped you build strong relationships as you scaled?",
    "Owen, your detailed feedback on the BetaHub community regarding onboarding processes showed real insight. What small change brought the biggest improvement?",
    "Tara, your podcast episode on creative branding strategies was packed with ideas. Which tip have your listeners said made the most difference?",
    "Simone, I saw your story on the Green Future initiative dinner your company hosted. What sparked the idea for the collaboration?",
    "Noah, your CEO's shout-out to your data visualization work at the town hall sounded well deserved. What's your go-to tool for sharing insights with non-technical teams?",
    "Alyssa, your tweet about building up your mentor circle really resonated. Who's been unexpectedly influential for your career growth?",
    "Chris, I enjoyed your LinkedIn comment about balancing big goals with small wins at FastPath. What helps you keep your team inspired week to week?",
    "Lara, your panel discussion on sustainable finance at the FinForward summit revealed some creative approaches. Which idea do you hope more companies adopt?",
    "Vik, I noticed your reply regarding flexible scheduling in the FlexWork group. Have you run into any common misconceptions about it?",
    "Selene, your profile video for the Engineering Women in Tech campaign was motivating. What advice would you give newcomers joining your field now?",
    "Matt, loved your summer photo series from the Build for Good volunteering event. Which project had the most lasting impact on the community?",
    "Olivia, your recent blog about making customer handovers smoother was spot on. What process tweak has paid off the most for your clients?",
    "Benji, your CEO's town hall highlight of your team's record customer service ratings made me curious. What traits do you look for most when hiring new reps?"
  ];

  // Create cycling message sets - rotation every cycle through all 20 messages
  const getMessageSet = (cycle: number) => {
    const shuffled = [...allMessages];
    const offset = (cycle * 4) % shuffled.length; // Rotate by 4 each cycle for more variety
    return [
      ...shuffled.slice(offset),
      ...shuffled.slice(0, offset)
    ];
  };

  const currentMessages = getMessageSet(currentCycle);
  const row1Messages = currentMessages.slice(0, 8);   // Row 1: 8 messages
  const row2Messages = currentMessages.slice(8, 16);  // Row 2: 8 messages
  const row3Messages = currentMessages.slice(16, 24); // Row 3: 8 messages  
  const row4Messages = currentMessages.slice(24, 32); // Row 4: 8 messages
  const row5Messages = currentMessages.slice(32, 40); // Row 5: 8 messages

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

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

  // Message cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCycle(prev => (prev + 1) % 5); // Cycle through 5 different combinations for more variety
    }, 15000); // Change every 15 seconds to give more time to read longer messages

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />
        
        {/* Video Player Modal */}
        <VideoPlayer 
          isOpen={isVideoPlayerOpen}
          onClose={() => setIsVideoPlayerOpen(false)}
          videoId="ZILw6IfCgNg"
        />

        {/* Scroll Velocity Hero Section */}
        <section className="relative w-full bg-background py-20 overflow-hidden min-h-screen flex items-center">
          {/* Background Scroll Velocity Messages */}
          <div className="absolute inset-0 z-0 w-full h-full flex flex-col justify-center space-y-8 opacity-30">
            <ScrollVelocity velocity={0.7} className="text-muted-foreground/40 leading-relaxed">
              {row1Messages}
            </ScrollVelocity>
            <ScrollVelocity velocity={-0.5} className="text-muted-foreground/30 leading-relaxed">
              {row2Messages}
            </ScrollVelocity>
            <ScrollVelocity velocity={0.9} className="text-muted-foreground/35 leading-relaxed">
              {row3Messages}
            </ScrollVelocity>
            <ScrollVelocity velocity={-0.4} className="text-muted-foreground/25 leading-relaxed">
              {row4Messages}
            </ScrollVelocity>
            <ScrollVelocity velocity={1.1} className="text-muted-foreground/30 leading-relaxed">
              {row5Messages}
            </ScrollVelocity>
          </div>

          {/* Hero Content Overlay */}
          <div className="relative z-10 w-full text-center">
            <div className="flex flex-row items-center justify-center space-x-1.5 mb-8">
              <span className={styles.pill}>Simple</span>
              <span className={styles.pill}>Scalable</span>
              <span className={styles.pill}>Passive</span>
            </div>
            <h1 className="mb-6">
              <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                Mass Messaging,
                <br />
              </span>
              <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                Uniquely Personal.
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto tracking-tight text-muted-foreground text-lg 2xl:text-xl">
              Hi, I&apos;m Mukesh and I have a deep passion for Sales and Learning new ways to maximise my Sales productivity, Here are some of my projects!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link href="mailto:Mukesh@spacebarR.Agency" passHref>
                <Button size="lg" className="px-8 py-3 text-lg">
                  Get in touch →
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Learn more
              </Button>
            </div>
          </div>
        </section>


        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="pt-12 mb-14 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <h2 className="py-16  pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
              I&apos;m an experienced Sales Hunter with an interest in {" "}
              <Link
                href="https://create.t3.gg/"
                target="_blank"
                className="underline"
              >
                IT and Engineering.
              </Link>{" "}
              My experience spans from startups to Fortune 100 Companies, 
              where I&apos;ve been instrumental in the entire     sales cycle. 
              
              I have vast experience in creative lead generation and sales clousures at both Mid-size and Enterprise levels.
              
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

        {/* Projects */}
        <section id="projects" data-scroll-section>
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
          <div data-scroll data-scroll-speed=".4" className="pt-12 mb-24">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Portfolio of Solutions.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve worked on a variety of projects, from small AI automations to
              large-scale AI automations. Here are some of my favorites:
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
                              // Open video player only for the SpacebarR project
                              if (project.title === "This website") {
                                setIsVideoPlayerOpen(true);
                              } else {
                                // For other projects, scroll to contact
                                const section = document.querySelector('#contact');
                                if (section) {
                                  section.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                    inline: "center",
                                  });
                                }
                              }
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
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="pt-12 mb-24 flex flex-col justify-start space-y-10"
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
                  Not sure what you need?
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    I got you.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Here are some of the services I offer. let&apos;s have a chat and I can help plan your next winning strategy.
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
        <section id="contact" data-scroll-section className="pt-12 mb-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s work{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Let me know what your goals are and leave the planning to me.
            </p>
            <Link href="mailto:Mukesh@spacebarR.Agency" passHref>
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
