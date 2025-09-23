const { replaceInFile } = require('replace-in-file');
const path = require('path');

const angularPath = '/Users/izzeddinashour/Desktop/Production-KNOLDG/KNOLDG-APP';
const nextPath = '/Users/izzeddinashour/Desktop/Production-KNOLDG/KnowrlandForClient';

const replacements = [
  {
    from: /https:\/\/api\.foresighta\.co/g,
    to: 'https://api.knoldg.com'
  },
  {
    from: /http:\/\/localhost:4200/g,
    to: 'https://app.knoldg.com'
  },
  {
    from: /http:\/\/localhost:3000/g,
    to: 'https://knoldg.com'
  }
];

async function restoreAll() {
  for (const r of replacements) {
    const results = await replaceInFile({
      files: [
        path.join(angularPath, '**/*.{ts,html,js}'),
        path.join(nextPath, '**/*.{ts,tsx,js,jsx}')
      ],
      from: r.from,
      to: r.to,
    });

    console.log(`🔁 Restored "${r.from}" → "${r.to}" in ${results.length} file(s).`);
  }
}

restoreAll()
  .then(() => console.log('✅ URL restoration to production completed.'))
  .catch(error => {
    console.error('❌ Error occurred during URL restoration:', error);
  });
