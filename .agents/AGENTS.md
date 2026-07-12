# Project Agent Rules: Etalase.AI

## Structured Prompt Engineering (Gemini SDK Best Practices)
When designing or refactoring prompts for LLMs (especially Google Gen AI / Gemini SDK):
- **Separate `systemInstruction`:** Always decouple the role, strict rules, guidelines, and output constraints into `config.systemInstruction` rather than mixing them into the `userPrompt`.
- **Specific Expert Persona:** Assign a concrete, domain-specific senior persona (e.g., "Senior Copywriter & Social Media Manager UMKM") instead of a generic "AI Assistant".
- **Detailed Tone & Vocabulary Guidelines:** Provide explicit rules, sapaan (*Kak/Sobat/Bapak/Ibu/Bunda*), and tone nuances for every tone choice offered to the user.
- **Deep Visual Analysis Instructions:** If handling image/multi-modal inputs (`inlineData`), explicitly instruct the model to deeply analyze the visual details of the image (texture, color, packaging, plating, setting) and incorporate them into the generated content for authenticity and accuracy.
- **Strict Constraints & JSON Boundaries:** Enforce clean JSON boundaries with `responseMimeType: "application/json"` and explicitly prohibit prohibited marketplace terms (hyperboles like *Paling/Nomor 1*) or unauthorized metadata (phone numbers/links).
