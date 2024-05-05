import Fuse from 'fuse.js';

// Threshold for the search algorithm. The lower it is, the more accurate the search will be
// Depending on if we use OpenAI we can set it higher to avoid getting useless request (rate limits / costs)
const THRESHOLD = 0.5;

function findBestMatch(items, pattern) {
  // Setting options for the fuse call
  const options = {
    includeScore: true,
    findAllMatches: true,
    threshold: THRESHOLD,
  };
  // Setting the fuse object
  const fuse = new Fuse(items, options);
  // Searching for the pattern
  const result = fuse.search(pattern);

  // Returning the best match
  return result.length > 0 ? result[0].item : null;
}

export default findBestMatch;
