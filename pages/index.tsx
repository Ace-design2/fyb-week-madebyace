import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Github from "../components/Icons/Github";
import Twitter from "../components/Icons/Twitter";
import Modal from "../components/Modal";
import ThemeToggle from "../components/ThemeToggle";
import getResults from "../utils/cachedImages";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";
import { motion } from "framer-motion";

const heroContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const bgVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
};

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>FYB Week Funaab - April 2026</title>
        <meta
          property="og:image"
          content="/og-image.png"
        />
        <meta
          name="twitter:image"
          content="/og-image.png"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4 relative">
        <ThemeToggle />
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="show"
            className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-2xl bg-black/5 dark:bg-white/10 px-6 pb-10 pt-32 text-center text-black dark:text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:shadow-highlight lg:pt-0"
          >
            <motion.div variants={bgVariants} className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/Image.PNG"
                alt="FYB Week Background"
                fill
                className="object-cover invert dark:invert-0 transition-all duration-300 opacity-60 dark:opacity-70"
                priority
              />
              <span className="absolute left-0 right-0 bottom-0 h-[500px] bg-gradient-to-b from-white/0 via-white to-white dark:from-black/0 dark:via-black dark:to-black transition-colors duration-300"></span>
            </motion.div>

            {/* Event Title */}
            <motion.h1 variants={itemVariants} className="relative z-10 mt-4 mb-0.5 text-3xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white">
              FYB Week '26
            </motion.h1>
            
            <motion.p variants={itemVariants} className="relative z-10 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
              Segun's Official Recap
            </motion.p>

            {/* Event Info Grid */}
            <motion.div 
              variants={itemVariants} 
              className="relative z-10 grid grid-cols-2 gap-3 w-full max-w-xs sm:max-w-sm rounded-xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 p-3 backdrop-blur-md text-left shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10 flex-shrink-0">
                  <svg className="h-3.5 w-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 leading-tight">Date</p>
                  <p className="text-[10px] sm:text-xs font-bold text-black dark:text-white truncate">April 20-26, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10 flex-shrink-0">
                  <svg className="h-3.5 w-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 leading-tight">Venue</p>
                  <p className="text-[10px] sm:text-xs font-bold text-black dark:text-white truncate">FUNAAB, Abeokuta</p>
                </div>
              </div>
            </motion.div>

            {/* Mini Event Day Timeline Tags */}
            <motion.div variants={itemVariants} className="relative z-10 flex flex-wrap justify-center gap-1.5 max-w-sm mt-1">
              {["Back to School", "Cultural Day", "Corporate Day", "Jersey Day"].map((day) => (
                <span 
                  key={day} 
                  className="rounded-md border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-zinc-600 dark:text-zinc-300"
                >
                  {day}
                </span>
              ))}
            </motion.div>

            <motion.p variants={itemVariants} className="relative z-10 max-w-[35ch] text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400 mt-1">
              Reliving the grand finale with coursemates and celebrating every milestone of our final year.
            </motion.p>

            <motion.div variants={itemVariants} className="z-10 mt-3 flex gap-3">
              <a
                className="flex items-center gap-1.5 rounded-lg border border-black dark:border-white bg-black dark:bg-white px-3.5 py-2 text-xs font-semibold text-white dark:text-black transition hover:scale-105 active:scale-95 hover:bg-black/90 dark:hover:bg-white/90"
                href="https://twitter.com/madebyacee"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter className="h-3.5 w-3.5" /> Twitter
              </a>
              <a
                className="flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/10 px-3.5 py-2 text-xs font-semibold text-black dark:text-white transition hover:scale-105 active:scale-95 hover:bg-black/10 dark:hover:bg-white/20"
                href="https://github.com/Ace-design-2"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
            </motion.div>
          </motion.div>
          {images.map(({ id, url, blurDataUrl }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 block w-full"
            >
              <Link
                href={`/?photoId=${id}`}
                as={`/p/${id}`}
                ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                shallow
                className="after:content group relative block w-full overflow-hidden rounded-lg cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
              >
                <Image
                  alt="FYB Week photo"
                  className="transform rounded-lg brightness-90 transition duration-500 will-change-auto group-hover:scale-105 group-hover:brightness-110"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  src={url}
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  width={720}
                  height={480}
                  unoptimized
                  sizes="(max-width: 640px) 100vw,
                    (max-width: 1280px) 50vw,
                    (max-width: 1536px) 33vw,
                    25vw"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="p-3 w-full flex justify-between items-center">
                    <span className="text-[9px] font-bold tracking-widest text-white uppercase bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                      Moment #{id + 1}
                    </span>
                    <span className="text-[10px] font-bold text-white drop-shadow-md tracking-wide">
                      VIEW PHOTO
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      <footer className="p-6 text-center text-zinc-500 text-sm sm:p-12">
        &copy; {new Date().getFullYear()} Segun Showunmi. Memories from Funaab FYB Week.
      </footer>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  return {
    props: {
      images: await getResults(),
    },
  };
}
