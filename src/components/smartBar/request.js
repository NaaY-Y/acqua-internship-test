import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// Function that asks OpenAI for a best match from the input in the given list
// WITHOUT TESTING
export async function requestBestMatch(list, input) {
  // Create a prompt using the list and the input to find the best match
  const prompt = `List: ${list.join(', ')}\nInput: ${input}\nBest Match:`;

  try {
    const completion = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt: prompt,
      max_tokens: 60,
      n: 1,
      stop: ['\n'],
    });
    console.log(completion.data.choices[0].text.trim());
    return completion.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error calling OpenAI to find best match:', error);
  }
  return undefined;
}

/*
Using express, we can also do server side (more secure because the user cannot interact with the request code)
We can also define here the timeout and rate-limits for this endpoint (So any user cannot use all of our credits) => Rely on the bestFind Algorithm

let app = express();
app.post('/openai/:word', (req, res) => {
  const input = req.params.word;

  Make the request here.

  const match = match found by OpenAI.
  res.status(200).json({match: match});

  Or

  res.status(404).json({error: "No match found"});

  Or

  res.status(500).json({error: "error during process"});
});
*/

export default requestBestMatch;
