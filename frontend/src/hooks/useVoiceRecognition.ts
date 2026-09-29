import { useState, useRef, useEffect } from 'react';

export interface DialectOption {
  id: string;
  name: string;
  region: string;
  sampleTranscript: string;
  extractedParams: {
    fullName: string;
    annualIncome: string;
    tribe: string;
    tribeId: string;
    course: string;
    institution: string;
  };
}

export const DIALECT_OPTIONS: DialectOption[] = [
  {
    id: 'santhali',
    name: 'Santhali (ᱥᱟᱱᱛᱟᱲᱤ)',
    region: 'Mayurbhanj (OD), Dumka (JH), Purulia (WB)',
    sampleTranscript: 'ᱤᱧᱟᱜ ᱧᱩᱛᱩᱢ ᱵᱤᱨᱥᱟ ᱢᱩᱨᱢᱩ ᱠᱟᱱᱟ᱾ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱨᱮᱱᱟᱜ ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱟᱨᱡᱟᱣ ₹1,20,000 ᱴᱟᱠᱟ᱾ ᱤᱧ ᱮᱱ.ᱟᱭᱤ.ᱴᱤ ᱨᱟᱣᱨᱠᱮᱞᱟ ᱨᱮ ᱠᱚᱢᱯᱭᱩᱴᱚᱨ ᱥᱟᱭᱮᱱᱥ ᱵᱤ.ᱴᱮᱠ ᱯᱟᱲᱦᱟᱣᱜ ᱠᱟᱱᱟᱧ᱾',
    extractedParams: {
      fullName: 'Birsa Murmu',
      annualIncome: '120000',
      tribe: 'Santhal',
      tribeId: 'ST-OD-2024-8849',
      course: 'B.Tech Computer Science & Engineering',
      institution: 'NIT Rourkela'
    }
  },
  {
    id: 'gondi',
    name: 'Gondi (गोण्डी)',
    region: 'Abujhmad, Bastar (CG), Gadchiroli (MH)',
    sampleTranscript: 'मावा पडोल सोमु मदकाम आन्दो। मन्दोद साला आमदानी ₹95,000 रुपया आन्दो। आय.आय.टी मुम्बई ते एम.टेक धातु विज्ञान करन्तो ना।',
    extractedParams: {
      fullName: 'Somu Madkam',
      annualIncome: '95000',
      tribe: 'Gond (Dandami Maria)',
      tribeId: 'ST-CG-2024-4192',
      course: 'M.Tech Metallurgical Engineering',
      institution: 'IIT Bombay'
    }
  },
  {
    id: 'bhili',
    name: 'Bhili (भीली)',
    region: 'Jhabua, Dhar (MP), Banswara (RJ)',
    sampleTranscript: 'मारो नाम अनिता भील छे। घरा नी सालिया कमाई ₹1,10,000 छे। मैं एम्स भोपाल मा डॉक्टरी एमबीबीएस नी पढ़ाई करी रही छू।',
    extractedParams: {
      fullName: 'Anita Bhil',
      annualIncome: '110000',
      tribe: 'Bhil',
      tribeId: 'ST-MP-2024-1102',
      course: 'MBBS (Bachelor of Medicine)',
      institution: 'AIIMS Bhopal'
    }
  },
  {
    id: 'hindi',
    name: 'Hindi (हिंदी)',
    region: 'Ranchi, Raipur, Bhopal, Pan-Tribal',
    sampleTranscript: 'मेरा नाम जयपाल उरांव है। परिवार की कुल वार्षिक आय ₹1,40,000 है। मैं आईआईटी रुड़की से बीटेक सिविल इंजीनियरिंग कर रहा हूँ।',
    extractedParams: {
      fullName: 'Jaipal Oraon',
      annualIncome: '140000',
      tribe: 'Oraon (Kurukh)',
      tribeId: 'ST-JH-2024-7712',
      course: 'B.Tech Civil Engineering',
      institution: 'IIT Roorkee'
    }
  },
  {
    id: 'english',
    name: 'English (Tribal Regional)',
    region: 'Northeast Tribal Corridor & Pan-India',
    sampleTranscript: 'My name is Sunita Munda. My family annual income is 150000 rupees. I am studying BA LLB Honors at National Law School Bangalore.',
    extractedParams: {
      fullName: 'Sunita Munda',
      annualIncome: '150000',
      tribe: 'Munda',
      tribeId: 'ST-JH-2024-3381',
      course: 'BA LLB (Honours)',
      institution: 'NLSIU Bengaluru'
    }
  }
];

export function useVoiceRecognition() {
  const [selectedDialect, setSelectedDialect] = useState<DialectOption>(DIALECT_OPTIONS[0]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState<any>(null);

  const startVoiceInput = () => {
    setIsListening(true);
    setTranscript('');
    setParsedData(null);

    // Simulate real-time speech stream typewriter
    const targetText = selectedDialect.sampleTranscript;
    let idx = 0;
    const interval = setInterval(() => {
      if (idx <= targetText.length) {
        setTranscript(targetText.substring(0, idx));
        idx += 3;
      } else {
        clearInterval(interval);
        setIsListening(false);
        setIsParsing(true);
        setTimeout(() => {
          setIsParsing(false);
          setParsedData(selectedDialect.extractedParams);
        }, 900);
      }
    }, 60);
  };

  const stopVoiceInput = () => {
    setIsListening(false);
  };

  return {
    selectedDialect,
    setSelectedDialect,
    isListening,
    startVoiceInput,
    stopVoiceInput,
    transcript,
    isParsing,
    parsedData
  };
}
