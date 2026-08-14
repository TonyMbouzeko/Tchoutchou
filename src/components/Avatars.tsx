import { motion } from "framer-motion";

export type Reaction =
  | "idle"
  | "happy"
  | "excited"
  | "sad"
  | "surprised"
  | "laugh"
  | "embarrassed";

interface AvatarSceneProps {
  reaction?: Reaction;
  bubble?: string;
  girlLean?: boolean;
}

export function AvatarScene({
  reaction = "idle",
  bubble,
  girlLean = false,
}: AvatarSceneProps) {

  // Animation du garçon selon la réaction
  const boyAnimation = () => {
    switch (reaction) {
      case "happy":
        return {
          y: [0, -10, 0],
          scale: [1, 1.05, 1],
        };

      case "excited":
        return {
          y: [0, -18, 0, -10, 0],
          rotate: [0, -3, 3, -2, 0],
        };

      case "sad":
        return {
          y: [0, 8],
          rotate: [0, -3],
          scale: [1, 0.97],
        };

      case "surprised":
        return {
          scale: [1, 1.12, 1],
          x: [0, -8, 0],
        };

      case "laugh":
        return {
          rotate: [0, -3, 3, -3, 0],
          y: [0, 4, 0, 4, 0],
        };

      case "embarrassed":
        return {
          rotate: [0, -4, 0],
          x: [0, -5, 0],
        };

      default:
        return {
          y: [0, -3, 0],
        };
    }
  };

  return (
    <div className="relative w-full flex justify-center items-end min-h-[230px] md:min-h-[300px] overflow-visible">

      {/* GARÇON */}
      <motion.div
        className="relative z-20 -mr-5 md:-mr-8"
        animate={boyAnimation()}
        transition={
          reaction === "idle"
            ? {
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 0.7,
                ease: "easeOut",
              }
        }
      >
        <img
          src="/avatars/boy.png"
          alt="Avatar garçon"
          className="
            h-[210px]
            md:h-[285px]
            w-auto
            object-contain
            drop-shadow-xl
            select-none
            pointer-events-none
          "
        />

        {/* Bulle de réaction */}
        {bubble && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            className="
              absolute
              -top-3
              left-[60%]
              bg-white
              text-gray-800
              px-4
              py-2
              rounded-2xl
              shadow-lg
              whitespace-nowrap
              text-sm
              md:text-base
              font-medium
              z-40
            "
          >
            {bubble}

            <div
              className="
                absolute
                -bottom-2
                left-5
                w-4
                h-4
                bg-white
                rotate-45
              "
            />
          </motion.div>
        )}

    
      </motion.div>

      {/* FILLE */}
      <motion.div
        className="relative z-10 -ml-5 md:-ml-8"
        animate={
          girlLean
            ? {
                x: [-5, -14, -8],
                rotate: [0, -2, 0],
              }
            : {
                y: [0, -3, 0],
              }
        }
        transition={
          girlLean
            ? {
                duration: 0.6,
              }
            : {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <img
          src="/avatars/girl.png"
          alt="Avatar fille"
          className="
            h-[205px]
            md:h-[280px]
            w-auto
            object-contain
            drop-shadow-xl
            select-none
            pointer-events-none
          "
        />
      </motion.div>

    </div>
  );
}