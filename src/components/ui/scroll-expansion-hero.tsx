'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import { motion } from 'framer-motion';
import { ScrollVelocity } from './scroll-velocity';

interface ScrollExpandMediaProps {
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  const sectionRef = useRef<HTMLDivElement | null>(null);

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

  // Create cycling message sets - rotation every cycle through all 40 messages
  const getMessageSet = (cycle: number) => {
    const shuffled = [...allMessages];
    const offset = (cycle * 4) % allMessages.length;
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

  // Cycle through message sets every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCycle(prev => (prev + 1) % 5);
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY > 0) {
        // Allow normal scrolling when fully expanded and scrolling down
        return;
      }

      if (e.deltaY < 0 && scrollProgress <= 0) {
        // Scrolling up at the beginning - do nothing
        return;
      }

      // Prevent default scrolling during expansion
      e.preventDefault();

      // Calculate new progress based on wheel delta
      const scrollSensitivity = 0.001;
      const delta = e.deltaY * scrollSensitivity;
      const newProgress = Math.min(Math.max(scrollProgress + delta, 0), 1);
      
      setScrollProgress(newProgress);
      setMediaFullyExpanded(newProgress >= 1);
      setShowContent(newProgress > 0.75);
    };

    const handleScroll = () => {
      // Keep scroll position locked at top until fully expanded
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollProgress, mediaFullyExpanded]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh] bg-background'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <motion.div
                className='fixed transition-none rounded-2xl overflow-hidden bg-background border border-border z-20'
                style={{
                  width: mediaFullyExpanded ? '100vw' : `${mediaWidth}px`,
                  height: mediaFullyExpanded ? '100vh' : `${mediaHeight}px`,
                  maxWidth: mediaFullyExpanded ? '100vw' : '95vw',
                  maxHeight: mediaFullyExpanded ? '100vh' : '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  opacity: 1
                }}
                transition={{
                  opacity: { duration: 0.8, ease: "easeInOut" }
                }}
              >
                {/* Scroll Velocity "Video" Content */}
                <div className='relative w-full h-full bg-background'>
                  <div className="absolute inset-0 z-0 w-full h-full flex flex-col justify-center space-y-6 opacity-90 overflow-hidden">
                    <ScrollVelocity velocity={0.35} className="text-muted-foreground/50 leading-relaxed">
                      {row1Messages}
                    </ScrollVelocity>
                    <ScrollVelocity velocity={-0.25} className="text-muted-foreground/40 leading-relaxed">
                      {row2Messages}
                    </ScrollVelocity>
                    <ScrollVelocity velocity={0.45} className="text-muted-foreground/45 leading-relaxed">
                      {row3Messages}
                    </ScrollVelocity>
                    <ScrollVelocity velocity={-0.2} className="text-muted-foreground/35 leading-relaxed">
                      {row4Messages}
                    </ScrollVelocity>
                    <ScrollVelocity velocity={0.55} className="text-muted-foreground/40 leading-relaxed">
                      {row5Messages}
                    </ScrollVelocity>
                  </div>

                  <motion.div
                    className='absolute inset-0 bg-background/20 rounded-xl'
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 0.2 - scrollProgress * 0.15 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Background fade overlay when sticky */}
                  {isSticky && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/60 z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                </div>

                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                  {date && (
                    <p
                      className='text-2xl text-primary/80'
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className='text-primary/80 font-medium text-center'
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </motion.div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-50 transition-none flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-center transition-none whitespace-nowrap'
                  style={{ 
                    transform: `translateX(-${textTranslateX}vw)`,
                    opacity: Math.max(0, 1 - scrollProgress * 1.2)
                  }}
                >
                  <span className="text-foreground">Mass Messaging,</span>
                </motion.h2>
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-center transition-none'
                  style={{ 
                    transform: `translateX(${textTranslateX}vw)`,
                    opacity: Math.max(0, 1 - scrollProgress * 1.2)
                  }}
                >
                  <span className="text-primary">Uniquely Personal.</span>
                </motion.h2>
              </div>
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;