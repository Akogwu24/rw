// Array of color names
const colorNames = ['Red', 'Green', 'Blue', 'amber', 'Yellow', 'Orange', 'Purple', 'Pink', 'Cyan', 'Teal'];

// Function to generate a random color and its name
export function getRandomColor() {
  // Generate a random index to select a color name
  const randomIndex = Math.floor(Math.random() * colorNames.length);
  const randomColorName = colorNames[randomIndex];

  // Generate a random RGB color
  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

  const new_col = randomColor.replace(/rgb/i, 'rgba');
  const newColorAplha = new_col.replace(/\)/i, ',0.2)');

  return { name: randomColorName, color: randomColor, newColorAplha };
}

// Example usage:
// const randomColorInfo = getRandomColor();
// console.log(`Random Color Name: ${randomColorInfo.name}`);
// console.log(`Random Color: ${randomColorInfo.color}`);

export function capitalizeFirstLetter(string: string) {
  if (!string) return;
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

export const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
export const videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];

export const timeout = (callback: () => void, delay = 3000) => {
  setTimeout(() => {
    callback();
  }, delay);
};

const toRadians = (degree) => {
  return degree * (Math.PI / 180);
};

export const calculateDistanceApart = (lat1, lon1, lat2, lon2) => {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in miles
  return distance.toFixed(2);
};
