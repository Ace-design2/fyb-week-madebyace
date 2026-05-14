import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Github from "../components/Icons/Github";
import Twitter from "../components/Icons/Twitter";
import Modal from "../components/Modal";
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
      <main className="mx-auto max-w-[1960px] p-4">
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
            className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0"
          >
            <motion.div variants={bgVariants} className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/Image.PNG"
                alt="FYB Week Background"
                fill
                className="object-cover"
                priority
              />
              <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="relative z-10 mt-8 mb-4 text-base font-bold uppercase tracking-widest text-white">
              Segun's FYB Week
            </motion.h1>
            <motion.p variants={itemVariants} className="relative z-10 max-w-[40ch] text-white sm:max-w-[32ch]">
              My favorite memories with coursemates during FYB Week in Funaab, April 2026.
            </motion.p>
            <motion.div variants={itemVariants} className="z-10 mt-6 flex gap-4 md:mt-4">
              <a
                className="flex items-center gap-2 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white"
                href="https://twitter.com/segunshowunmi"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter className="h-4 w-4" /> Twitter
              </a>
              <a
                className="flex items-center gap-2 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white"
                href="https://github.com/segunshowunmi"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" /> GitHub
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
