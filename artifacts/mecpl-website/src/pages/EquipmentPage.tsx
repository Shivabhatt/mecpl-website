import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const equipment = [
  {
    title: "Automated Concrete Batching Plants",
    desc: "Complete high-output automated concrete batching plants equipped with specialized Star Batcher Management Core Systems.",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop",
  },

  {
    title: "Schwing Stetter Concrete Pumps",
    desc: "High-pressure industrial mobile concrete delivery pumps for tall vertical structural pours.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
  },

  {
    title: "Boomplacer Fleet Systems",
    desc: "High-reach heavy articulate concrete distribution mechanisms providing maximum concrete reach.",
    image:
      "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=1600&auto=format&fit=crop",
  },

  {
    title: "Mobile Boom Placer Machinery",
    desc: "Rapid deployment vehicular systems for dynamic job-site requirements.",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1600&auto=format&fit=crop",
  },

  {
    title: "Tower Boom Placer Infrastructure",
    desc: "Pinned structural steel tower systems for vertical concrete placement at extreme heights.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function EquipmentPage() {

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {

      const imageAnchor =
        document.querySelector(".image-anchor");

      const images =
        gsap.utils.toArray<HTMLElement>(".image-layer");

      const contents =
        gsap.utils.toArray<HTMLElement>(".content-block");

      // =========================
      // INITIAL STATES
      // =========================

      gsap.set(images, {
        position: "absolute",
        inset: 0,
        clipPath: "inset(100% 0% 0% 0%)",
        zIndex: 1,
      });

      gsap.set(images[0], {
        clipPath: "inset(0% 0% 0% 0%)",
        zIndex: 10,
      });

      gsap.set(contents, {
        position: "absolute",
        opacity: 0,
        scale: 0.8,
        y: 80,
      });

      gsap.set(contents[0], {
        opacity: 1,
        scale: 1,
        y: 0,
      });

      // =========================
      // MASTER TIMELINE
      // =========================

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-wrapper",
          start: "top top",
          end: `+=${equipment.length * 1400}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      equipment.forEach((_, index) => {

        if (index === equipment.length - 1) return;

        const currentImage = images[index];
        const nextImage = images[index + 1];

        const currentContent = contents[index];
        const nextContent = contents[index + 1];

        tl

          // IMAGE ANCHOR MOVE
          .to(
            imageAnchor,
            {
              left:
                index % 2 === 0
                  ? "50%"
                  : "6%",

              duration: 1,
              ease: "power3.inOut",
            },
            index
          )

          // CURRENT CONTENT OUT
          .to(
            currentContent,
            {
              opacity: 0,
              scale: 0.8,
              y: -60,
              duration: 0.8,
              ease: "power3.out",
            },
            index
          )

          // NEXT CONTENT IN
          .to(
            nextContent,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: "power4.out",
            },
            index + 0.15
          )

          // CURRENT IMAGE CLOSE
          .to(
            currentImage,
            {
              clipPath:
                "inset(0% 0% 100% 0%)",

              duration: 1,
              ease: "power4.inOut",
            },
            index
          )

          // NEXT IMAGE OPEN
          .to(
            nextImage,
            {
              clipPath:
                "inset(0% 0% 0% 0%)",

              duration: 1,
              ease: "power4.inOut",
            },
            index
          );

      });

      ScrollTrigger.refresh();

    }, sectionRef);

    return () => ctx.revert();

  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-[#f5f5f3] overflow-hidden"
    >

      {/* HERO */}
      <section className="py-32 border-b border-black/10">

        <div className="max-w-7xl mx-auto px-6">

          <span className="text-[#C41E3A] uppercase tracking-[0.3em] text-xs font-bold">
            Infrastructure Assets
          </span>

          <h3 className="text-3xl font-black uppercase leading-none mt-6 text-black">
            Advanced Machinery Inventory
          </h3>

          <div className="w-20 h-[2px] bg-[#C41E3A] mt-8"></div>

          <p className="text-gray-600 text-lg mt-8 max-w-2xl leading-relaxed">
            Our execution velocity stems directly from total strategic ownership
            over heavy industrial machinery assets.
          </p>

        </div>

      </section>

      {/* SCROLL STORY */}
      <section
        className="scroll-wrapper relative"
        style={{
          height: `${equipment.length * 140}vh`,
        }}
      >

        {/* STICKY CONTAINER */}
        <div className="sticky-container h-screen overflow-hidden relative">

          {/* IMAGE ANCHOR */}
          <div className="image-anchor absolute left-[6%] top-1/2 -translate-y-1/2 w-[42vw] h-[72vh]">

            {equipment.map((item, i) => (

              <div
                key={i}
                className="image-layer overflow-hidden"
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

              </div>

            ))}

          </div>

          {/* CONTENT BLOCKS */}
          {equipment.map((item, i) => (

            <div
              key={i}
              className="content-block absolute w-[36vw] max-w-[620px]"
              style={{
                left:
                  i % 2 === 0
                    ? "58%"
                    : "8%",

                top: "28%",
              }}
            >

              <span className="text-[#C41E3A] uppercase tracking-[0.3em] text-xs font-bold">
                Equipment 0{i + 1}
              </span>

              <h3 className="text-3xl leading-[0.9] font-black uppercase mt-6 text-black">
                {item.title}
              </h3>

              <div className="w-20 h-[2px] bg-[#C41E3A] mt-8"></div>

              <p className="text-gray-600 text-lg leading-relaxed mt-8">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}
