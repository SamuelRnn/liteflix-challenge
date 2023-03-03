import { useEffect } from "react";
import { useState } from "react";
import { config } from "./config";
import { getFeaturedMovie, getPopularMovies } from "./services";
import { Nav, MoviesShowcase, LoaderScreen } from "./components";
import { GoPlusSmall } from "react-icons/go";
import { BsPlay } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [cover, setCover] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  const fetchData = async () => {
    Promise.all([getFeaturedMovie(), getPopularMovies()]).then((res) => {
      setTimeout(() => {
        setPopularMovies(res[1]);
        setCover(res[0]);
      }, 500);
    });
  };
  const onLoad = () => {
    setLoadedImages((prevState) => {
      if (prevState === 4) {
        setLoading(false);
      }
      return prevState + 1;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <LoaderScreen />}</AnimatePresence>
      {cover && popularMovies && (
        <main>
          <header className="h-screen relative overflow-hidden bg-black">
            {/* header background */}
            <motion.img
              initial="loading"
              animate={loading ? "loading" : "charged"}
              variants={{
                charged: { scale: 1, opacity: 0.8 },
                loading: { scale: 1.4, opacity: 0.8 },
              }}
              transition={{ duration: 2.3, ease: "circOut" }}
              className="absolute w-full h-full object-cover"
              src={config.IMAGES_BASEPATH + cover.backdrop_path}
              alt={cover.original_title}
              onLoad={onLoad}
            />
            {/* nav container */}
            <AnimatePresence>
              {!loading && (
                <motion.div
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                  className="fixed w-full h-20 z-50"
                >
                  <Nav />
                </motion.div>
              )}
            </AnimatePresence>
            {/* content and mask */}
            <div className="bg-gradient-to-t from-mask to-mask/50 absolute w-full h-full pt-20 pb-10">
              <div className="w-main h-full mx-auto grid grid-cols-3 gap-8">
                {/* cover description */}
                <div className="md:col-span-2 col-span-3 flex flex-col justify-end md:pb-20 text-center md:text-left">
                  <p className="uppercase font-thin md:text-lg">
                    <span className="text-zinc-300">original de </span>
                    <span className="font-normal">liteflix</span>
                  </p>
                  <h2 className="uppercase text-3xl md:text-4xl lg:text-5xl text-aqua font-bold">
                    {cover.original_title}
                  </h2>
                  <div className="flex flex-col gap-4 mt-6 md:flex-row">
                    <button className="flex justify-center items-center h-12 bg-dark uppercase font-thin w-full border border-dark max-w-[16rem] max-md:mx-auto">
                      <BsPlay className="text-2xl" />
                      Reproducir
                    </button>
                    <button className="flex justify-center items-center h-12 bg-dark/40 uppercase font-thin w-full border border-white/40 max-w-[16rem] max-md:mx-auto">
                      <GoPlusSmall className="text-2xl" />
                      Mi lista
                    </button>
                  </div>
                </div>
                {/* popular movies container */}
                <div className="hidden md:flex place-items-center">
                  <MoviesShowcase
                    movies={popularMovies}
                    onLoad={onLoad}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </header>
        </main>
      )}
    </>
  );
}
