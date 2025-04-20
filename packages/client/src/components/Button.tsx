import clsx from "clsx";

export const Button = ({
  onClick,
  isActive,
}: {
  isActive: boolean;
  onClick: () => void;
}) => {
  // DRAW
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx([
        "budclient:cursor-pointer",
        "budclient:text-white",
        "budclient:bg-blue-700",
        "budclient:hover:bg-blue-800",
        "budclient:font-medium",
        "budclient:rounded-full",
        "budclient:text-sm",
        "budclient:p-2.5",
        "budclient:text-center",
        "budclient:inline-flex",
        "budclient:items-center",
        "budclient:dark:bg-blue-600",
        "budclient:dark:hover:bg-blue-700",
        "budclient:dark:focus:ring-blue-800",
        "budclient:transition-all",
        "budclient:hover:scale-105",
        { "budclient:scale-105": isActive },
      ])}
    >
      {isActive ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m20.713 8.128l-.246.566a.506.506 0 0 1-.934 0l-.246-.566a4.36 4.36 0 0 0-2.22-2.25l-.759-.339a.53.53 0 0 1 0-.963l.717-.319a4.37 4.37 0 0 0 2.251-2.326l.253-.611a.506.506 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.718.32a.53.53 0 0 1 0 .962l-.76.338a4.36 4.36 0 0 0-2.219 2.251M12 4a8 8 0 1 0 7.944 7.045l1.986-.236Q22 11.396 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2c.861 0 1.699.11 2.498.315L14 4.252A8 8 0 0 0 12 4m1 7h3l-5 7v-5H8l5-7z"
          ></path>
        </svg>
      )}
    </button>
  );
};
