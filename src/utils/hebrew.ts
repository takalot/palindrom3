interface PalindromeResult {
  normalized: string;
  original: string;
  length: number;
}

export function findPalindromes(text: string, minLength: number, maxLength: number): PalindromeResult[] {
  const letters: string[] = [];
  const positions: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c >= 'א' && c <= 'ת') {
      letters.push(normalizeLetter(c));
      positions.push(i);
    }
  }
  const normalized = letters.join('');
  const results: PalindromeResult[] = [];

  for (let len = maxLength; len >= minLength; len--) {
    for (let start = 0; start <= normalized.length - len; start++) {
      const sub = normalized.substring(start, start + len);
      if (isPalindrome(sub)) {
        const origStart = positions[start];
        const origEnd = positions[start + len - 1] + 1;
        const original = text.substring(origStart, origEnd);
        results.push({ normalized: sub, original, length: len });
      }
    }
  }
  return results;
}

function normalizeLetter(c: string): string {
  switch (c) {
    case 'ך': return 'כ';
    case 'ם': return 'מ';
    case 'ן': return 'נ';
    case 'ף': return 'פ';
    case 'ץ': return 'צ';
    default: return c;
  }
}

function isPalindrome(s: string): boolean {
  for (let i = 0; i < Math.floor(s.length / 2); i++) {
    if (s[i] !== s[s.length - 1 - i]) return false;
  }
  return true;
}