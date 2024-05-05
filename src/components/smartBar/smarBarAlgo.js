import Fuse from 'fuse.js';

// Threshold for the search algorithm
const THRESHOLD = 0.5;

function findBestMatch(items, pattern) {
  const options = {
    includeScore: true,
    findAllMatches: true,
    threshold: THRESHOLD,
  };

  const fuse = new Fuse(items, options);
  const result = fuse.search(pattern);

  console.log(result);

  return result.length > 0 ? result[0].item : null;
}

export default findBestMatch;
