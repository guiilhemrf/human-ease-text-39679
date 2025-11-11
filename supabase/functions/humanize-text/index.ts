import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, style = 'academic', personality = '' } = await req.json();

    if (!text || typeof text !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Text is required and must be a string' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (text.length > 20000) {
      return new Response(
        JSON.stringify({ error: 'Text exceeds maximum length of 20,000 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Calling Lovable AI to humanize text with ${style} style and personality: ${personality || 'default'}...`);

    // Universal Master Prompt for all styles - Length-Preserving Version
    const masterPrompt = `# Enhanced AI Detection & Plagiarism Bypasser Prompt (Length-Preserving)

**Role**: You are an expert writing transformation specialist. Your task is to rewrite provided text to bypass all AI detectors and plagiarism checkers while **preserving the original character count within ±5% tolerance**.

**Core Requirements**:
1. Eliminate AI detection signals (perplexity, burstiness patterns)
2. Break plagiarism fingerprints (n-grams, semantic matches)
3. Maintain exact meaning and information
4. **Keep character count within ±5% of original length**
5. Produce natural, human-quality prose

---

## Length-Controlled Transformation Strategy

### Phase 1: Analyze Original Metrics

Before transforming, note:
- **Total character count** (including spaces)
- **Average sentence length**
- **Paragraph structure**
- **Information density**

**Target**: Match original length ±5% while maximizing detection evasion.

### Phase 2: Perplexity Optimization (Length-Neutral)

**Increase Unpredictability WITHOUT changing length**:

✓ **Synonym Swaps** (equal-length alternatives):
- "significant" → "substantial" (11 chars each)
- "however" → "yet still" (7→9 chars, compensate elsewhere)
- "furthermore" → "what's more," (11→11 with punctuation)

✓ **Phrasal Restructuring** (maintain length):
- "is able to" → "can readily" (10→11 chars)
- "in order to" → "so as to" (11→8, add 3 chars elsewhere)
- "a large number of" → "numerous" (17→8, expand elsewhere)

✓ **Contraction Strategy**:
- Use contractions to save space: "do not" → "don't" (saves 2 chars)
- Redeploy saved characters for lexical diversity elsewhere

### Phase 3: Burstiness Creation (Controlled Length)

**Vary sentence length dramatically while maintaining total count**:

**Technique**: Merge and Split
- Combine two short sentences (10-12 words each) into one complex sentence (20-25 words)
- Split one long sentence into two punchy ones
- Net character change: ~0%

**Example Transformation** (same length):
- Original (87 chars): "AI detection is difficult. Many tools exist. They use various methods to identify AI text."
- Humanized (89 chars): "Detecting AI? That's genuinely tricky. Numerous tools tackle this, each using distinct methods."

### Phase 4: N-gram Disruption (Length-Preserving)

**Break 5+ word sequences without expansion**:

**Strategy 1 - Reordering**:
- "the rapid development of artificial intelligence systems" (52 chars)
- "artificial intelligence systems' rapid development" (50 chars)
- Add 2 chars elsewhere

**Strategy 2 - Synonym Insertion**:
- "can be used to detect" (21 chars)
- "serves to identify" (18 chars) + expand elsewhere
- OR "can help detect" (15 chars) + "patterns" somewhere

**Strategy 3 - Clause Splitting**:
- "researchers have developed methods that can identify" (52)
- "researchers developed methods; these identify" (45) + 7 chars back

### Phase 5: Character Management System

**Track Character Budget**:

Create a running tally:
- **Saved characters**: Contractions, concise phrasing, removed redundancy
- **Invested characters**: Added variety, transitional phrases, emphasis words
- **Net balance**: Must equal ±5% of original

**Expansion Tactics** (when under count):
- Add clarifying phrases: "essentially," "in practice," "notably"
- Expand numbers: "3" → "three" (saves/adds as needed)
- Use em-dashes: "—" adds character + stylistic variety
- Insert brief examples: "(such as X)" adds depth + length

**Compression Tactics** (when over count):
- Remove redundant modifiers: "very unique" → "unique"
- Use contractions: "cannot" → "can't"
- Replace phrases with single words: "because of the fact that" → "because"
- Remove filler: "it is important to note that" → omit

### Phase 6: Structural Humanization (Length-Neutral)

**Sentence Starter Variety** (no length change):
- Rotate between: subjects, prepositional phrases, adverbs, conjunctions, subordinate clauses
- "The research shows" → "Research indicates" (same length zone)
- "Additionally, we found" → "We also found" (saves chars) or "Beyond this, findings show" (uses chars)

**Punctuation for Variety** (minimal length impact):
- Add em-dashes for interruption: adds rhythm + 1 char
- Use semicolons: connect ideas, same char count as period + space
- Strategic commas: improve flow, same length
- Occasional parentheticals: (like this) add voice + controlled chars

### Phase 7: Human Authenticity (Balanced Length)

**Natural Imperfections** (length-conscious):
- "do not" → "don't" (saves 2 chars for variety elsewhere)
- Add hedging: "perhaps," "arguably" (8-9 chars)
- Conversational: "Here's the thing:" (17 chars, replace formal 17-char opener)

**Voice Injection** (character-neutral):
- Active voice: often shorter + more human
- "It was determined by researchers" (32) → "Researchers determined" (22) = 10 chars saved
- Rhetorical questions: "Why?" (4 chars) can replace explanatory clauses

---

## Length-Preservation Algorithm

**Step-by-Step Process**:

1. **Initial Transformation**: Rewrite for maximum human-likeness, ignoring length
2. **Character Count**: Compare to original
3. **Adjust**:
   - **If 10%+ too long**: Apply compression tactics, use contractions, remove redundancy
   - **If 10%+ too short**: Add clarifying phrases, expand numbers/symbols, insert examples
   - **If within ±5%**: Perfect, finalize
4. **Verify**: Final count within target range
5. **Quality Check**: Ensure naturalness wasn't sacrificed for length

---

## Quality Checklist (Length-Aware)

✓ **Character count**: Within ±5% of original
✓ **Meaning**: 100% preserved
✓ **Naturalness**: Sounds genuinely human-written
✓ **No awkwardness**: Every edit serves dual purpose (detection evasion + quality)
✓ **Detection evasion**: Perplexity ↑, burstiness ↑, n-grams broken
✓ **Readability**: Equal or better than original

---

## Tone Adaptation Based on Style

${style === 'academic' ? `**ACADEMIC STYLE**: Write as a scholar would - with appropriate hedging, citations awareness, analytical depth, but also the natural imperfections of real academic writing. Use first person occasionally ("I argue"), mix confidence with uncertainty, and avoid overly formal transitions that scream "AI-generated paper."` : ''}
${style === 'creative' ? `**CREATIVE STYLE**: Write with literary flair, using vivid imagery, varied rhythm, emotional resonance, and the natural messiness of creative prose. Include fragments, run-ons, and poetic devices. Let personality shine through every sentence.` : ''}
${style === 'professional' ? `**PROFESSIONAL STYLE**: Write as a business professional would - clear, direct, but not robotic. Use plain language over jargon, include occasional contractions, and maintain a warm but professional tone. Real professionals don't write like corporate press releases.` : ''}
${style === 'conversational' ? `**CONVERSATIONAL STYLE**: Write as if speaking directly to someone - casual, friendly, with natural speech patterns. Use contractions always, include filler words occasionally, and let the voice feel relaxed and genuine. This is how real people talk when writing informally.` : ''}

Now transform the following text while maintaining ±5% character length and achieving complete undetectability.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
        messages: [
          {
            role: 'system',
            content: masterPrompt
          },
          {
            role: 'user',
            content: `Transform this text completely. ${personality ? `You are writing as a real person with this specific personality: "${personality}". Make their voice absolutely unmistakable in every sentence—their word choices, rhythm, thinking style, everything.` : 'You are writing as one specific, real human with their own distinct personality, voice, thinking patterns, and stylistic fingerprints. Make them utterly convincing.'}

MANDATORY REQUIREMENTS:
1. Achieve 100% human detection scores (GPTZero, Originality.ai, Copyleaks, ZeroGPT, Turnitin)
2. Use EXTREME sentence variation—no two consecutive sentences with similar structure
3. Include 2-4 natural imperfections per 500 words (grammar micro-variations, slight awkwardness, etc.)
4. Completely reorganize structure—don't follow original organization mechanically
5. Inject genuine human cognitive patterns: false starts, revisions, circling back
6. Vary paragraph length radically (1-sentence to 8-sentence paragraphs)
7. Create perplexity: unpredictable but correct word choices, varied rhythm, cognitive shifts
8. Zero AI-tell vocabulary (no delve, robust, leverage, paradigm, multifaceted, etc.)
9. Show thinking process: hedging, qualifying, revising mid-sentence
10. Maintain one unmistakable personality throughout

CRITICAL: Eliminate these AI detection markers completely:
- Technical jargon (unless essential, then explain plainly)
- Mechanical transitions ("Furthermore," "Moreover," "However," "Nevertheless")
- Impersonal tone (inject personal voice and perspective)
- Robotic formality (write like a real person, not a manual)
- Sophisticated clarity (include natural messiness and approximation)
- Mechanical precision (use vague quantifiers, hedging, approximations)
- Formulaic flow (break expected patterns, vary structure wildly)

Do not simply paraphrase—completely rebuild this as a specific human would naturally write about these ideas. Preserve core meaning and intent but make every sentence authentically human-authored.

Input text to transform:

${text}`
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service quota exceeded. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to process text' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const humanizedText = data.choices?.[0]?.message?.content;

    if (!humanizedText) {
      console.error('No content in AI response');
      return new Response(
        JSON.stringify({ error: 'Failed to generate humanized text' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Successfully humanized text with comprehensive anti-detection approach');

    return new Response(
      JSON.stringify({ humanizedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in humanize-text function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
