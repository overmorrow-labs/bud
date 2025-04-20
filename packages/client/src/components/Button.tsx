import clsx from "clsx";

export const Button = ({ onClick }: { onClick: () => void }) => {
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
        "budclient:me-2",
        "budclient:dark:bg-blue-600",
        "budclient:dark:hover:bg-blue-700",
        "budclient:dark:focus:ring-blue-800",
      ])}
    >
      Bud Client
    </button>
  );
};
