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

export function GetRandomArrayItems<T>(items: T[], max: number): T[] {
  const rawItems = items.map((e) => e);
  const randomItems: T[] = [];

  for (let i = 0; i <= max - 1; i++) {

    const itemIndex = getRandomIndex(rawItems.length - 1);

    randomItems.push(rawItems[itemIndex]);
    rawItems.splice(itemIndex, 1);
  }

  return randomItems;
}

export function GetRandomArrayItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export const Capitalized = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
