export const introduceDelay = async (delay = 4000): Promise<boolean> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
      // eslint-disable-next-line indent,@typescript-eslint/indent
      // tslint:disable-next-line:align
    }, delay)
  );

// ---------------------------------------------------------------
