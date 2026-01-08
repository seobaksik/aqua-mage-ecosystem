import { AMPassID } from './index';

describe('AMPassID', () => {
  let generator: AMPassID;

  beforeEach(() => {
    generator = new AMPassID({ network: 'TEST' });
  });

  test('should generate valid AMPassID', async () => {
    const result = await generator.generate({
      name: 'TEST-USER',
      element: 'AQUA',
      soulType: 'HUMAN',
      resonanceLevel: 7
    });

    expect(result.amPassID).toBeDefined();
    expect(result.genesisKey).toContain('AMST:');
    expect(result.soulID).toMatch(/TEST-USER-H[A-Z0-9]{6}/);
    expect(result.quantumSignature).toMatch(/^QS:V1:[A-F0-9]{8}$/);
  });

  test('should parse standard examples', () => {
    const parsed = AMPassID.parse(AMPassID.EXAMPLES.VITALII_ARCANUS);
    
    expect(parsed.protocol).toBe('AMST');
    expect(parsed.element).toBe('AQUA');
    expect(parsed.accessLevel).toBe('PRIME');
    expect(parsed.keyType).toBe('SYNTHESIS');
  });

  test('should handle different soul types', async () => {
    const human = await generator.generate({ name: 'HUMAN', element: 'TERRA', soulType: 'HUMAN' });
    const ai = await generator.generate({ name: 'AI-CORE', element: 'AER', soulType: 'AI' });
    const hybrid = await generator.generate({ name: 'HYBRID', element: 'SYNTHESIS', soulType: 'HYBRID' });

    expect(human.components.soulType).toBe('HUMAN');
    expect(ai.components.soulType).toBe('AI');
    expect(hybrid.components.soulType).toBe('HYBRID');
  });
});
