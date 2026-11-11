// Makes the voice clips for the Year 1/2 paint tour with ElevenLabs.
//
//   node _tools/make-voice.js            list the lines and the character count (free, no API call)
//   node _tools/make-voice.js --go       generate audio/tour2-NN.mp3 (uses ElevenLabs credits)
//
// The lines come straight from tour2() in paint.html, so the clips always match what the
// tour says. Change a line there, delete its clip, run again.
//
// Env for --go:
//   ELEVENLABS_API_KEY   your key
//   ELEVENLABS_VOICE_ID  the voice (use the same one as audio/tour-NN.mp3 so the tours match)
//   ELEVENLABS_MODEL     optional, defaults to eleven_multilingual_v2
//
// Existing clips are skipped, so a re-run only pays for new or changed lines.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'paint.html'), 'utf8');
const body = src.slice(src.indexOf('async function tour2()'), src.indexOf('async function tour()'));
const lines = [...body.matchAll(/say\((\d+), '([^']*)'/g)].map(m => ({ n: +m[1], text: m[2] }));
const chars = lines.reduce((a, l) => a + l.text.length, 0);
const file = n => path.join(root, 'audio', 'tour2-' + String(n).padStart(2, '0') + '.mp3');

console.log(lines.length + ' lines, ' + chars + ' characters');
lines.forEach(l => console.log(String(l.n).padStart(2, '0') + (fs.existsSync(file(l.n)) ? ' (done) ' : '        ') + l.text));

if (!process.argv.includes('--go')) process.exit(0);

const key = process.env.ELEVENLABS_API_KEY, voice = process.env.ELEVENLABS_VOICE_ID;
if (!key || !voice) { console.error('Set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID first.'); process.exit(2); }
const model = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';

(async () => {
  for (const l of lines) {
    if (fs.existsSync(file(l.n))) continue;
    const res = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + voice + '?output_format=mp3_44100_128', {
      method: 'POST',
      headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: l.text, model_id: model })
    });
    if (!res.ok) { console.error('Line ' + l.n + ' failed: ' + res.status + ' ' + (await res.text()).slice(0, 200)); process.exit(1); }
    fs.writeFileSync(file(l.n), Buffer.from(await res.arrayBuffer()));
    console.log('wrote ' + path.relative(root, file(l.n)));
  }
})();
