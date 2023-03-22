const getRandomIndex = (n: number) => Math.round(Math.random() * n);

export const GetRatingPercent = (value: number, round = false): string => {
  const result = (round ? Math.round(value) : value) / 0.05;
  return `${result}%`;
};

export const GetRandomArrayLines = (lines: string[], max: number): string[] => {
  const rawImages = lines.map((e) => e);
  const resultImages: string[] = [];

  for (let i = 0; i <= max - 1; i++) {

    const imageIndex = getRandomIndex(rawImages.length - 1);

    resultImages.push(rawImages[imageIndex]);
    rawImages.splice(imageIndex, 1);
  }

  return resultImages;
};

export function GetRandomArrayItems<T>(lines: T[], max: number): T[] {
  const rawImages = lines.map((e) => e);
  const resultImages: T[] = [];

  for (let i = 0; i <= max - 1; i++) {

    const imageIndex = getRandomIndex(rawImages.length - 1);

    resultImages.push(rawImages[imageIndex]);
    rawImages.splice(imageIndex, 1);
  }

  return resultImages;
}
