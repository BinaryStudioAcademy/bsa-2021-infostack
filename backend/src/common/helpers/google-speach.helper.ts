// Imports the Google Cloud client library
import speech from '@google-cloud/speech';
import fs from 'fs';

// Creates a client
const client = new speech.SpeechClient();

export async function transcriptAudio(file: Express.Multer.File) {
  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: fs.readFileSync(file.path).toString('base64'),
  };

  const config = {
    sampleRateHertz: 48000,
    languageCode: 'en-US',
    model: 'video',
    enableAutomaticPunctuation: true,
  };

  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);

  return transcription;
}
