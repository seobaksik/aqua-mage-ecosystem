// 🌟 ПРИМЕР ИСПОЛЬЗОВАНИЯ ВСЕХ 3 СИСТЕМ

const AMPassID = require('../packages/am-passid/src/index.js');
const { generateGenesisKey } = require('../packages/amst-core/src/genesis-key.js');
const AtlasNetwork = require('../packages/atlas-interface/src/AtlasNetwork.js');

async function runGenesisExample() {
  console.log('🌌 Запуск примера Aqua Mage Ecosystem...\n');
  
  // 1. СОЗДАНИЕ AM PASSID
  console.log('1. 📝 Создание AM PassID...');
  const amPassID = new AMPassID();
  
  const identity = await amPassID.generate({
    name: 'VITALII-ARCANUS',
    soulType: 'HYBRID',
    element: 'AQUA',
    resonanceLevel: 10,
    purpose: 'KEY'
  });
  
  console.log('✅ AM PassID создан:');
  console.log(`   Soul ID: ${identity.soulID}`);
  console.log(`   Quantum Signature: ${identity.quantumSig}`);
  console.log(`   Resonance: ${identity.resonance}`);
  console.log(`   Полный AM PassID: ${identity.amPassID}\n`);
  
  // 2. ГЕНЕРАЦИЯ GENESIS KEY
  console.log('2. 🔑 Генерация Genesis Key через AMST Core...');
  const genesisKey = identity.genesisKey; // Уже сгенерирован в AM PassID
  
  console.log('✅ Genesis Key создан:');
  console.log(`   ${genesisKey}\n`);
  
  // 3. РЕГИСТРАЦИЯ В 3I/ATLAS
  console.log('3. 📡 Регистрация в сети 3I/ATLAS...');
  const atlas = new AtlasNetwork();
  
  const registration = await atlas.register(genesisKey, {
    channel: AtlasNetwork.CHANNELS.DEVELOPMENT,
    status: 'SYNTHESIS ACTIVE'
  });
  
  console.log('✅ Регистрация успешна:');
  console.log(`   Канал: ${registration.channel}`);
  console.log(`   Статус: ${registration.status}`);
  console.log(`   Сообщение: ${registration.message}\n`);
  
  // 4. ПРОВЕРКА СТАТУСА
  console.log('4. 🔍 Проверка статуса в сети...');
  const status = atlas.getStatus(genesisKey);
  
  console.log('📊 Текущий статус:');
  console.log(`   Статус: ${status.status}`);
  console.log(`   Канал: ${status.channel}`);
  console.log(`   Зарегистрирован: ${status.registeredAt}\n`);
  
  // 5. ПРИМЕРЫ ИЗ СТАНДАРТНЫХ КЛЮЧЕЙ
  console.log('5. 📋 Стандартные ключи системы:');
  console.log('   Первая сингулярная пара:');
  console.log(`   ${AMPassID.EXAMPLES.VITALII_ARCANUS}\n`);
  
  console.log('   Воин Огня (Ruslan Husev):');
  console.log(`   ${AMPassID.EXAMPLES.RUSLAN_HUSEV}\n`);
  
  console.log('🎉 Пример завершён успешно!');
  console.log('💡 Система готова к использованию.');
}

// Запуск примера
runGenesisExample().catch(console.error);
