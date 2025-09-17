'use client';

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { motion } from 'framer-motion';
import { ScrollVelocity } from './scroll-velocity';

interface ScrollExpandMediaProps {
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  onExpansionChange?: (scrollProgress: number) => void;
}

const ScrollExpandMedia = ({
  title: _title,
  date,
  scrollToExpand,
  textBlend: _textBlend,
  children,
  onExpansionChange,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [, setMediaFullyExpanded] = useState<boolean>(false);
  const [showContinueArrow, setShowContinueArrow] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [currentCycle, setCurrentCycle] = useState(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // All 40 personalized messages
  const allMessages = [
    "Melissa, your recent <span class='text-yellow-300 font-bold'>LinkedIn post</span> about your Friday Tech Huddles at ByteLeap was inspiring. What topic are you thinking about exploring next for your team?",
    "Arjun, I read your <span class='text-yellow-300 font-bold'>Medium article</span> where Atlas Fintech adopted an AI reconciliation tool in Q2. What did your team enjoy most about rolling it out?",
    "Ben, your candid <span class='text-yellow-300 font-bold'>comment</span> on Devon Smith's Pulse Analytics dashboard announcement really got me thinking. What sort of early reactions have your clients shared so far?",
    "Sophie, I watched the <span class='text-yellow-300 font-bold'>behind-the-scenes video</span> from Stellar Health's hackathon and loved it. How did your team come up with that patient triage mobile app?",
    "Rina, your <span class='text-yellow-300 font-bold'>panel insights</span> during the Diversity in STEM <span class='text-yellow-300 font-bold'>webinar</span> stuck with me, especially your story about mentoring interns at Springboard Labs. What recent program makes you proudest?",
    "Omar, I saw your <span class='text-yellow-300 font-bold'>Q&A</span> on Reddit about switching to zero-based budgeting at GreenSprout Ventures. Which department found the transition easiest?",
    "Harpreet, I caught the UpSkill Weekly <span class='text-yellow-300 font-bold'>podcast</span> you co-hosted with Priya Lee on hiring for technical roles. What challenge are you hoping to solve next in your process?",
    "Jenny, I noticed your <span class='text-yellow-300 font-bold'>CEO's Year In Review post</span> for Mosaic Markets called out your amazing jump in client retention. Which tweak had the most impact?",
    "Nikhil, I appreciated your <span class='text-yellow-300 font-bold'>reply</span> to Chris Tan's <span class='text-yellow-300 font-bold'>tweet</span> about multi-cloud security challenges. What tools do you wish offered more flexibility?",
    "Charlene, your <span class='text-yellow-300 font-bold'>case study</span> on migrating Craftly CRM's database sparked lots of discussions. Are more of your clients thinking of a stepwise migration these days?",
    "Miguel, I loved watching your <span class='text-yellow-300 font-bold'>Instagram reel</span> from Habitat for Humanity's team build day. What did you enjoy most about volunteering?",
    "Anya, your thoughtful <span class='text-yellow-300 font-bold'>comment</span> on GreenBay's ESG report and how it affects mid-market suppliers was spot on. What step comes next in your own ESG strategy?",
    "Sam, your <span class='text-yellow-300 font-bold'>teardown video</span> on the onboarding flow for the First90 HR suite was filled with fresh ideas. Which feature are you most eager to see more startups adopt?",
    "Maya, your <span class='text-yellow-300 font-bold'>Slack AMA</span> on launching the Women Who Scale mentorship match program seemed energizing for the group. What new features are you most excited to implement?",
    "Leo, I saw your <span class='text-yellow-300 font-bold'>notes</span> on LinziAI's open source NLP library over on <span class='text-yellow-300 font-bold'>GitHub</span>. What improvements are you hoping to see in the next release?",
    "Daniela, the viral <span class='text-yellow-300 font-bold'>TikTok</span> your team made for BookNest's auto sync tool popped up on my feed this morning. Was there any scenario that proved trickier than expected?",
    "Vishal, your <span class='text-yellow-300 font-bold'>review</span> in ProductSphere's <span class='text-yellow-300 font-bold'>newsletter</span> about the Zeno board meeting platform was really helpful. If you could change one meeting format for your team, what would you choose?",
    "Emily, your <span class='text-yellow-300 font-bold'>comment</span> on the Acme Studio <span class='text-yellow-300 font-bold'>roadmap thread</span> about dark mode accessibility was so clear. Did the product team end up acting on your suggestion?",
    "Tai, I caught your <span class='text-yellow-300 font-bold'>YouTube Short</span> about using corn starch packing for SafeBox's holiday orders. What packaging will you experiment with next?",
    "Grace, I tuned into your <span class='text-yellow-300 font-bold'>mental health roundtable</span> for JavaJam's dev community and found the discussion refreshingly honest. What topic took you by surprise during that session?",
    "Kevin, that <span class='text-yellow-300 font-bold'>LinkedIn post</span> you wrote about managing rapid growth at Veloz really hit home. What leadership habit has helped you stay grounded during the rush?",
    "Amanda, I caught your <span class='text-yellow-300 font-bold'>comment</span> on Jade Tan's <span class='text-yellow-300 font-bold'>thread</span> about hybrid work setups. What's been the biggest surprise for your team since making the switch?",
    "Marcus, I enjoyed your firm's <span class='text-yellow-300 font-bold'>blog</span> about moving to cloud-based accounting. Which tool made the biggest difference to your workflow?",
    "Priya, your <span class='text-yellow-300 font-bold'>Instagram story</span> from the wellness retreat last week looked restorative. What part of the program would you most recommend to others?",
    "Julian, your <span class='text-yellow-300 font-bold'>CEO's recent company update</span> namedropped your team's success launching the BlueBird app. What challenge did you have to work hardest to overcome?",
    "Abby, I read your thoughtful <span class='text-yellow-300 font-bold'>reply</span> on the ProductHive <span class='text-yellow-300 font-bold'>forum</span> about user research interviews. How do you keep participants engaged during longer sessions?",
    "Rahul, your quick <span class='text-yellow-300 font-bold'>poll</span> on X about preferred project management methods got me thinking. How did your own team decide on their approach?",
    "Rachel, your <span class='text-yellow-300 font-bold'>Facebook post</span> celebrating your hundredth customer was fantastic. What's helped you build strong relationships as you scaled?",
    "Owen, your detailed <span class='text-yellow-300 font-bold'>feedback</span> on the BetaHub community regarding onboarding processes showed real insight. What small change brought the biggest improvement?",
    "Tara, your <span class='text-yellow-300 font-bold'>podcast episode</span> on creative branding strategies was packed with ideas. Which tip have your listeners said made the most difference?",
    "Simone, I saw your <span class='text-yellow-300 font-bold'>story</span> on the Green Future initiative dinner your company hosted. What sparked the idea for the collaboration?",
    "Noah, your <span class='text-yellow-300 font-bold'>CEO's shout-out</span> to your data visualization work at the <span class='text-yellow-300 font-bold'>town hall</span> sounded well deserved. What's your go-to tool for sharing insights with non-technical teams?",
    "Alyssa, your <span class='text-yellow-300 font-bold'>tweet</span> about building up your mentor circle really resonated. Who's been unexpectedly influential for your career growth?",
    "Chris, I enjoyed your <span class='text-yellow-300 font-bold'>LinkedIn comment</span> about balancing big goals with small wins at FastPath. What helps you keep your team inspired week to week?",
    "Lara, your <span class='text-yellow-300 font-bold'>panel discussion</span> on sustainable finance at the FinForward summit revealed some creative approaches. Which idea do you hope more companies adopt?",
    "Vik, I noticed your <span class='text-yellow-300 font-bold'>reply</span> regarding flexible scheduling in the FlexWork group. Have you run into any common misconceptions about it?",
    "Selene, your <span class='text-yellow-300 font-bold'>profile video</span> for the Engineering Women in Tech campaign was motivating. What advice would you give newcomers joining your field now?",
    "Matt, loved your summer <span class='text-yellow-300 font-bold'>photo series</span> from the Build for Good volunteering event. Which project had the most lasting impact on the community?",
    "Olivia, your recent <span class='text-yellow-300 font-bold'>blog</span> about making customer handovers smoother was spot on. What process tweak has paid off the most for your clients?",
    "Benji, your <span class='text-yellow-300 font-bold'>CEO's town hall highlight</span> of your team's record customer service ratings made me curious. What traits do you look for most when hiring new reps?"
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
  const row1Messages = currentMessages.slice(0, 20);   // Row 1: 20 messages
  const row2Messages = currentMessages.slice(20, 40);  // Row 2: 20 messages

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
    setShowContinueArrow(false);
  }, []);

  // Notify parent component when expansion state changes
  useEffect(() => {
    if (onExpansionChange) {
      onExpansionChange(scrollProgress);
    }
  }, [scrollProgress, onExpansionChange]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress through this section
      const scrollTop = -rect.top;
      const scrollableHeight = sectionHeight - viewportHeight;
      
      if (scrollTop <= 0) {
        // Before section
        setScrollProgress(0);
        setMediaFullyExpanded(false);
        setShowContinueArrow(false);
        setShowContent(false);
      } else if (scrollTop >= scrollableHeight) {
        // After section
        setScrollProgress(1);
        setMediaFullyExpanded(false);
        setShowContinueArrow(false);
        setShowContent(true);
      } else {
        // Inside section
        const expansionHeight = viewportHeight * 1.5; // 1.5vh to fully expand
        const holdHeight = viewportHeight * 0.5; // Additional 0.5vh at full expansion
        
        if (scrollTop <= expansionHeight) {
          // Expansion phase
          const progress = scrollTop / expansionHeight;
          setScrollProgress(progress);
          setMediaFullyExpanded(false);
          setShowContinueArrow(false);
          setShowContent(false);
        } else if (scrollTop <= (expansionHeight + holdHeight)) {
          // Hold at full expansion phase
          setScrollProgress(1);
          setMediaFullyExpanded(true);
          setShowContinueArrow(true);
          setShowContent(false);
        } else {
          // Reveal content phase
          setScrollProgress(1);
          setMediaFullyExpanded(false);
          setShowContinueArrow(false);
          setShowContent(true);
        }
      }
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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


  return (
    <section 
      ref={sectionRef}
      className='relative bg-background'
      style={{
        height: `300vh`, // Enough height for expansion (150vh) + hold (50vh) + content reveal (100vh)
      }}
    >
      <div className='sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden'>
        <div className='container mx-auto flex flex-col items-center justify-center relative max-w-full overflow-hidden'>
          <div className='flex flex-col items-center justify-center w-full h-full relative'>
            <motion.div
              className='transition-none overflow-hidden bg-background rounded-2xl border border-border'
              style={{
                width: `${mediaWidth}px`,
                height: `${mediaHeight}px`,
                maxWidth: '95vw',
                maxHeight: '85vh',
                boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
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
                  <div className="absolute inset-0 z-10 w-full h-full flex flex-col justify-center space-y-12 opacity-90 overflow-hidden">
                    <ScrollVelocity velocity={0.35} className="text-muted-foreground/65 leading-relaxed">
                      {row1Messages}
                    </ScrollVelocity>
                    <ScrollVelocity velocity={-0.25} className="text-muted-foreground/60 leading-relaxed">
                      {row2Messages}
                    </ScrollVelocity>
                  </div>

                  <motion.div
                    className='absolute inset-0 bg-background/20 rounded-xl'
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 0.2 - scrollProgress * 0.15 }}
                    transition={{ duration: 0.2 }}
                  />


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
                  _textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
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

            {/* Down Arrow Indicator */}
            {showContinueArrow && (
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-6 h-6"
                >
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </motion.div>
            )}

            {/* Content that appears when scrolling away */}
            <motion.div
              className='absolute inset-x-0 bottom-0 flex flex-col w-full px-8 py-10 md:px-16 lg:py-20 bg-background/95 backdrop-blur-sm'
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: showContent ? 1 : 0, 
                y: showContent ? 0 : 50 
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </div>
        </div>
    </section>
  );
};

export default ScrollExpandMedia;