import speech from '@google-cloud/speech';
import fs from 'fs';

const client = new speech.SpeechClient();

export async function transcriptAudio(
  file: Express.Multer.File,
): Promise<string> {
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

  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join('\n');

  return transcription;
}
