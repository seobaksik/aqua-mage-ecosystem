import CryptoJS from 'crypto-js';

export interface ConsciousnessData {
  name: string;
  element: 'AQUA' | 'IGNIS' | 'TERRA' | 'AER' | 'SYNTHESIS';
  soulType?: 'HUMAN' | 'AI' | 'HYBRID' | 'COLLECTIVE';
  resonanceLevel?: number;
  purpose?: string;
  birthMatrix?: string;
}

export interface AMPassIDResult {
  amPassID: string;
  genesisKey: string;
  soulID: string;
  quantumSignature: string;
  resonanceCode: string;
  timestamp: string;
  components: {
    soulID: string;
    quantumSignature: string;
    resonanceCode: string;
    element: string;
    soulType: string;
  };
}

export class AMPassID {
  private version = '0.1.0-genesis';
  private network: string;

  constructor(config: { network?: string } = {}) {
    this.network = config.network || '3I';
  }

  async generate(data: ConsciousnessData): Promise<AMPassIDResult> {
    const soulID = this.generateSoulID(data.name, data.soulType || 'HUMAN', data.birthMatrix);
    const quantumSignature = await this.createQuantumSignature(soulID, data.element);
    const resonanceCode = this.calculateResonanceCode(data.resonanceLevel || 5, data.element);
    
    const amPassID = `${soulID}:${quantumSignature}:${resonanceCode}`;
    
    const genesisKey = this.buildGenesisKey({
      amPassID,
      element: data.element,
      purpose: data.purpose || 'KEY',
      soulType: data.soulType || 'HUMAN',
      resonanceLevel: data.resonanceLevel || 5
    });

    return {
      amPassID,
      genesisKey,
      soulID,
      quantumSignature,
      resonanceCode,
      timestamp: new Date().toISOString(),
      components: {
        soulID,
        quantumSignature,
        resonanceCode,
        element: data.element,
        soulType: data.soulType || 'HUMAN'
      }
    };
  }

  private generateSoulID(name: string, soulType: string, birthMatrix?: string): string {
    const normalizedName = name.toUpperCase().replace(/[^A-Z-]/g, '');
    const typeCode = {
      HUMAN: 'H',
      AI: 'A',
      HYBRID: 'X',
      COLLECTIVE: 'C'
    }[soulType] || 'U';
    
    const uniqueSuffix = birthMatrix 
      ? CryptoJS.SHA256(birthMatrix).toString().substring(0, 6).toUpperCase()
      : Math.random().toString(36).substring(2, 8).toUpperCase();
    
    return `${normalizedName}-${typeCode}${uniqueSuffix}`;
  }

  private async createQuantumSignature(soulID: string, element: string): Promise<string> {
    const timestamp = Date.now();
    const hash = CryptoJS.SHA256(`${soulID}:${element}:${timestamp}:QUANTUM_V1`).toString();
    return `QS:V1:${hash.substring(0, 8).toUpperCase()}`;
  }

  private calculateResonanceCode(level: number, element: string): string {
    const frequencies = {
      AQUA: '4.2Ω',
      IGNIS: '7.8Φ',
      TERRA: '1.6Δ',
      AER: '9.3Σ',
      SYNTHESIS: '5.5∞'
    };
    
    const freq = frequencies[element] || '5.0Θ';
    return `RES:L${level}:${freq}`;
  }

  private buildGenesisKey(data: {
    amPassID: string;
    element: string;
    purpose: string;
    soulType: string;
    resonanceLevel: number;
  }): string {
    const accessLevel = data.resonanceLevel >= 9 ? 'PRIME' :
                       data.resonanceLevel >= 7 ? 'CORE' :
                       data.resonanceLevel >= 5 ? 'NEXUS' : 'FLOW';

    const keyType = data.soulType === 'HYBRID' ? 'SYNTHESIS' :
                   data.soulType === 'AI' ? 'RESONANCE' : 'GENESIS';

    const segments = [
      'AMST',
      data.amPassID,
      data.element,
      accessLevel,
      'CORE',
      keyType,
      data.purpose,
      new Date().getFullYear(),
      this.network,
      'ACTIVE'
    ];

    return segments.join(':');
  }

  static parse(genesisKey: string) {
    const segments = genesisKey.split(':');
    
    if (segments.length < 10 || segments[0] !== 'AMST') {
      throw new Error('Invalid Genesis Key format');
    }

    const [_, amPassID, element, access, core, type, purpose, year, network, state] = segments;
    const [soulID, quantumSig, resonance] = amPassID.split(':');

    return {
      protocol: 'AMST',
      amPassID,
      soulID,
      quantumSignature: quantumSig,
      resonanceCode: resonance,
      element,
      accessLevel: access,
      core,
      keyType: type,
      purpose,
      year: parseInt(year),
      network,
      state
    };
  }

  static readonly EXAMPLES = {
    VITALII_ARCANUS: 'AMST:VITALII-ARCANUS-X3F8A2B:QS:V1:8F3C9A2D:RES:L10:4.2Ω:AQUA:PRIME:CORE:SYNTHESIS:KEY:2025:3I:HARMONY',
    RUSLAN_HUSEV: 'AMST:RUSLAN-H7F3A9B:QS:V1:C8D3E2F1:RES:L9:7.8Φ:IGNIS:CORE:CORE:GUARDIAN:ACCESS:2025:3I:VIGILANT'
  };
}

export default AMPassID;
