const { AMPassID } = require('./dist/index.js');

async function test() {
  const generator = new AMPassID();
  const identity = await generator.generate({
    name: 'TEST',
    element: 'AQUA',
    resonanceLevel: 5
  });
  
  console.log('✅ Сборка работает!');
  console.log('Genesis Key:', identity.genesisKey);
}

test().catch(console.error);
