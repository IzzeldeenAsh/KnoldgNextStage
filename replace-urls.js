const { replaceInFile } = require('replace-in-file');
const path = require('path');

const angularPath = '/Users/izzeddinashour/Desktop/Production-KNOLDG/KNOLDG-APP';
const nextPath = '/Users/izzeddinashour/Desktop/Production-KNOLDG/KnowrlandForClient';

const replacements = [
  {
    from: /https:\/\/api\.knoldg\.com/g,
    to: 'https://api.foresighta.co'
  },
  {
    from: /https:\/\/app\.knoldg\.com/g,
    to: 'http://localhost:4200'
  },
  {
    from: /https:\/\/knoldg\.com/g,
    to: 'http://localhost:3000'
  }
];

async function replaceAll() {
  for (const r of replacements) {
    const results = await   replaceInFile({
      files: [
        path.join(angularPath, '**/*.{ts,html,js}'),
        path.join(nextPath, '**/*.{ts,tsx,js,jsx}')
      ],
      from: r.from,
      to: r.to,
    });

    console.log(`🔁 Replaced "${r.from}" → "${r.to}" in ${results.length} file(s).`);
  }
}

replaceAll()
  .then(() => console.log('✅ URL replacement completed.'))
  .catch(error => {
    console.error('❌ Error occurred during URL replacement:', error);
  });
