/**
 * Ingredient data sourced from:
 * 1. "Skincare ingredients recommended by cosmetic dermatologists: A Delphi consensus study"
 *    (Journal of the American Academy of Dermatology, 2025) — 62 dermatologists, 43 centers,
 *    23 ingredients achieving consensus across 7 skin concerns.
 *    PubMed: https://pubmed.ncbi.nlm.nih.gov/40233838/
 * 2. FDA Cosmetic Ingredients pages: https://www.fda.gov/cosmetics/cosmetic-products-ingredients
 * 3. NCBI PubMed & PubMed Central (NIH): https://www.ncbi.nlm.nih.gov
 *    Peer-reviewed clinical studies and systematic reviews for individual ingredients.
 * 4. EU CosIng (Cosmetic Ingredients Database) — European Commission
 *    Regulation (EC) No 1223/2009 on cosmetic products.
 *    https://ec.europa.eu/growth/tools-databases/cosing/
 *    Provides INCI names, EU regulatory status (restricted/prohibited/allowed), and Annex references.
 *    Direct link: https://ec.europa.eu/growth/tools-databases/cosing/
 */

export const INGREDIENT_GLOSSARY = [

  // ─── DELPHI CONSENSUS: Lines & Wrinkles ───────────────────────────────────
  {
    name: "Retinoids",
    aliases: ["retinol", "retinyl palmitate", "retinaldehyde", "tretinoin", "vitamin a", "retinoic acid"],
    category: "Anti-aging",
    benefit: "The gold standard anti-aging ingredient, backed by 96.8% consensus in a 2025 Delphi study of 62 cosmetic dermatologists. Retinoids work by speeding up how quickly your skin renews itself — old cells shed faster, collagen production ramps up, and dark spots fade over time. Think of it as a reset button for your skin. Start slowly (2–3 nights a week) to avoid dryness, and always use it at night since it breaks down in sunlight.",
    concerns: ["lines_wrinkles", "acne", "dark_spots", "large_pores", "oily_skin"],
    delphi_consensus: true,
    cosing_note: "EU CosIng: Retinol (Vitamin A) is listed as a restricted ingredient under Annex III of Regulation (EC) No 1223/2009. Face products max 0.3% retinol; body lotions max 0.3%; products for children under 3 and mucous membranes are prohibited. As of 2025, stricter limits apply for rinse-off products.",
    pubmed_refs: [
      { title: "Retinol: The Ideal Retinoid for Cosmetic Solutions", url: "https://pubmed.ncbi.nlm.nih.gov/35816071/" },
      { title: "Evidence for the Efficacy of Over-the-counter Vitamin A Cosmetic Products", url: "https://pubmed.ncbi.nlm.nih.gov/34980969/" },
    ],
    icon: "⏳"
  },
  {
    name: "Vitamin C",
    aliases: ["ascorbic acid", "l-ascorbic acid", "sodium ascorbyl phosphate", "ascorbyl glucoside", "magnesium ascorbyl phosphate", "ascorbyl tetraisopalmitate"],
    category: "Brightening",
    benefit: "One of the most rigorously studied brightening ingredients in dermatology, with 88.7% expert consensus for fighting fine lines and dark spots (Delphi study, 2025). It works as a powerful antioxidant — neutralizing the free radicals from sun and pollution that break down collagen — while also directly stimulating your skin to produce more collagen. Clinical studies show it's most effective as L-ascorbic acid at 10–20% concentration.",
    concerns: ["lines_wrinkles", "dark_spots"],
    delphi_consensus: true,
    pubmed_refs: [
      { title: "Topical Vitamin C and the Skin: Mechanisms of Action and Clinical Applications", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5605218/" },
      { title: "The Roles of Vitamin C in Skin Health", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5579659/" },
    ],
    icon: "🍊"
  },
  {
    name: "Mineral Sunscreen",
    aliases: ["zinc oxide", "titanium dioxide", "mineral spf"],
    category: "Sun Protection",
    benefit: "The safest and most trusted form of sun protection — zinc oxide and titanium dioxide are the only two sunscreen actives the FDA currently classifies as Category I (generally recognized as safe and effective). Unlike chemical sunscreens, they sit on top of your skin and physically deflect UVA and UVB rays rather than absorbing them. Dermatologists ranked them at 96.8% consensus for preventing premature aging and redness (Delphi study, 2025). Especially well-suited for sensitive skin and rosacea.",
    concerns: ["lines_wrinkles", "redness"],
    delphi_consensus: true,
    fda_note: "FDA recognizes zinc oxide and titanium dioxide as GRASE sunscreen active ingredients.",
    cosing_note: "EU CosIng: Zinc Oxide (CI 77947) listed in Annex VI — max 25% as UV filter. Titanium Dioxide (CI 77891) listed in Annex VI — max 25% as UV filter. Both are approved permitted UV filters under Regulation (EC) No 1223/2009.",
    icon: "☀️"
  },
  {
    name: "Chemical Sunscreen",
    aliases: ["avobenzone", "octinoxate", "octisalate", "octocrylene", "homosalate", "oxybenzone"],
    category: "Sun Protection",
    benefit: "Achieved 82.3% consensus among dermatologists for preventing UV-driven aging (Delphi study, 2025). Chemical sunscreens absorb UV rays and convert them into harmless heat — they're lightweight, invisible on the skin, and tend to spread more easily than mineral options. The FDA has asked manufacturers for more safety data on 12 of these actives, so they're legal and widely used but not yet given a full safety clearance the way mineral filters have been.",
    concerns: ["lines_wrinkles"],
    delphi_consensus: true,
    fda_note: "FDA has asked manufacturers for more safety data on 12 chemical sunscreen ingredients. They are not prohibited but further data is needed before GRASE classification.",
    cosing_note: "EU CosIng: Avobenzone (Butyl Methoxydibenzoylmethane) in Annex VI — max 5%. Octocrylene max 10% (9% for children's sunscreen). Oxybenzone (Benzophenone-3) restricted to max 6%, prohibited in children under 2 and on large body areas for adults per SCCS opinion. Always check specific limits per active.",
    icon: "☀️"
  },

  // ─── DELPHI CONSENSUS: Acne ───────────────────────────────────────────────
  {
    name: "Salicylic Acid",
    aliases: ["bha", "beta hydroxy acid", "beta-hydroxy acid"],
    category: "Exfoliant",
    benefit: "A dermatologist favourite for acne-prone skin, with strong expert consensus in the 2025 Delphi study. Because it's oil-soluble (unlike most acids), salicylic acid can penetrate directly into your pores — dissolving the sebum and dead skin cells that cause blackheads, whiteheads, and breakouts from the inside out. It also reduces inflammation, so existing spots calm down faster. The FDA recommends 0.5–2% for over-the-counter use.",
    concerns: ["acne", "large_pores", "oily_skin"],
    delphi_consensus: true,
    fda_note: "FDA-recognized OTC acne active ingredient at 0.5–2% concentration.",
    cosing_note: "EU CosIng: Salicylic Acid listed in Annex III (restricted). In cosmetics (other than rinse-off hair products) max 2.0%; in rinse-off hair products max 3.0%. Prohibited in children's products where it may come into contact with mucous membranes.",
    pubmed_refs: [
      { title: "Clinical Efficacy of a Salicylic Acid-Containing Gel on Acne Vulgaris", url: "https://pubmed.ncbi.nlm.nih.gov/40682377/" },
      { title: "Treatment of acne vulgaris with salicylic acid pads", url: "https://pubmed.ncbi.nlm.nih.gov/1535287/" },
    ],
    icon: "🎯"
  },
  {
    name: "Benzoyl Peroxide",
    aliases: ["bpo"],
    category: "Acne Treatment",
    benefit: "One of the most effective over-the-counter acne treatments available, with Delphi consensus among dermatologists. It works by releasing oxygen directly into the pore, which kills the acne-causing bacteria (C. acnes) that thrive in low-oxygen environments. It also reduces swelling and redness around active spots. Clinically effective from as low as 2.5% — higher concentrations don't work better but do increase dryness. Fair warning: it will bleach fabric on contact.",
    concerns: ["acne"],
    delphi_consensus: true,
    fda_note: "FDA-approved OTC acne active ingredient.",
    cosing_note: "EU CosIng: Benzoyl Peroxide is listed as a restricted substance in Annex III. Permitted in cosmetic preparations at max 0.7% for nail preparations only. It is not authorized as a general skin or acne cosmetic active in the EU — higher concentrations require medical prescription in the EU.",
    icon: "🎯"
  },
  {
    name: "Azelaic Acid",
    aliases: [],
    category: "Acne Treatment",
    benefit: "A multi-tasking acid backed by Delphi dermatologist consensus for both acne and redness. It fights breakouts by targeting acne bacteria, but also fades the dark marks left behind — making it especially useful if you deal with both active acne and post-inflammatory hyperpigmentation. It's one of the few actives considered safe during pregnancy, and is well-tolerated even by sensitive skin types. Available in OTC formulas and as a prescription (15–20%) for conditions like rosacea.",
    concerns: ["acne", "redness", "dark_spots"],
    delphi_consensus: true,
    pubmed_refs: [
      { title: "Azelaic acid 15% gel in the treatment of rosacea", url: "https://pubmed.ncbi.nlm.nih.gov/18803456/" },
      { title: "A systematic review to evaluate the efficacy of azelaic acid", url: "https://pubmed.ncbi.nlm.nih.gov/37550898/" },
    ],
    icon: "🌿"
  },
  {
    name: "Niacinamide",
    aliases: ["vitamin b3", "nicotinamide"],
    category: "Brightening",
    benefit: "One of the most versatile ingredients in skincare, achieving Delphi consensus across four different skin concerns: acne, large pores, oily skin, and dark spots. It's a form of Vitamin B3 that works in multiple ways at once — it signals your skin to produce less oil, reduces the appearance of pores, fades uneven pigmentation, and helps rebuild the protective skin barrier. Clinical studies confirm it's well-tolerated even by sensitive skin with very few side effects at concentrations of 5–10%.",
    concerns: ["acne", "large_pores", "oily_skin", "dark_spots", "redness"],
    delphi_consensus: true,
    pubmed_refs: [
      { title: "Mechanistic Insights into the Multiple Functions of Niacinamide", url: "https://pubmed.ncbi.nlm.nih.gov/38671873/" },
      { title: "Efficacy of ceramides and niacinamide-containing moisturizer in acne", url: "https://pubmed.ncbi.nlm.nih.gov/38299457/" },
    ],
    icon: "⭐"
  },

  // ─── DELPHI CONSENSUS: Redness ────────────────────────────────────────────
  {
    name: "Centella Asiatica",
    aliases: ["cica", "gotu kola", "madecassoside", "asiaticoside", "centella"],
    category: "Soothing",
    benefit: "A traditional healing plant used for centuries in Asian medicine, now with strong clinical evidence behind it — backed by Delphi consensus for calming redness and irritation. Its active compounds (madecassoside and asiaticoside) have been shown in peer-reviewed studies to reduce skin inflammation, strengthen the outer skin barrier, and accelerate wound healing. It's a go-to for reactive, stressed, or post-procedure skin.",
    concerns: ["redness"],
    delphi_consensus: true,
    pubmed_refs: [
      { title: "Pharmacological Effects of Centella asiatica on Skin Diseases", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8627341/" },
      { title: "Centella asiatica in cosmetology", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3834700/" },
    ],
    icon: "🌸"
  },
  {
    name: "Green Tea Extract",
    aliases: ["camellia sinensis", "egcg", "epigallocatechin gallate"],
    category: "Antioxidant",
    benefit: "Rich in a powerful antioxidant called EGCG (epigallocatechin gallate), green tea extract has earned Delphi consensus for reducing redness and skin irritation. EGCG neutralises free radicals — the unstable molecules from UV and pollution that cause premature aging and inflammation. Peer-reviewed research confirms it has meaningful anti-inflammatory effects on skin, making it a reliable soother for reactive or sensitive skin types.",
    concerns: ["redness"],
    delphi_consensus: true,
    icon: "🍵"
  },

  // ─── DELPHI CONSENSUS: Dark Spots ─────────────────────────────────────────
  {
    name: "Alpha Hydroxy Acids (AHAs)",
    aliases: ["glycolic acid", "lactic acid", "mandelic acid", "malic acid", "tartaric acid", "citric acid", "aha"],
    category: "Exfoliant",
    benefit: "AHAs are water-soluble acids that exfoliate the top layer of skin, encouraging dead cells to shed and revealing fresher, more even-toned skin underneath. Backed by Delphi consensus for fading dark spots and improving texture. Clinical research (including extensive FDA review) shows they reduce hyperpigmentation, smooth fine lines, and improve overall radiance. One important caveat: AHAs make your skin more sensitive to sunlight by up to 18%, so daily SPF is non-negotiable when using them.",
    concerns: ["dark_spots", "lines_wrinkles", "dry_skin"],
    delphi_consensus: true,
    fda_note: "FDA-studied ingredient. AHAs increase UV sensitivity — always pair with SPF. FDA recommends ≤10% AHA with pH ≥3.5 for consumer safety.",
    cosing_note: "EU CosIng: Glycolic Acid and other AHAs are listed in Annex III (restricted). For face: max 10% at pH ≥3.5 with UV protection labeling required. For rinse-off hair products: max 6.0%. Products must carry the warning 'Contains AHA. Avoid sun exposure when using this product.'",
    pubmed_refs: [
      { title: "Glycolic acid peel therapy – a current review", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3875240/" },
    ],
    icon: "✨"
  },
  {
    name: "Kojic Acid",
    aliases: [],
    category: "Brightening",
    benefit: "A naturally derived brightening agent with Delphi consensus for fading dark spots. Kojic acid is produced during the fermentation of certain fungi, and it works by blocking tyrosinase — the enzyme your skin needs to produce melanin (pigment). Less melanin means existing dark spots fade and new ones are slower to form. It's particularly effective for melasma, sun spots, and post-acne marks, and is often combined with Vitamin C for a stronger brightening effect.",
    concerns: ["dark_spots"],
    delphi_consensus: true,
    icon: "🌟"
  },
  {
    name: "Tranexamic Acid",
    aliases: [],
    category: "Brightening",
    benefit: "A newer brightening ingredient gaining strong traction in clinical research and Delphi recognition for dark spots and melasma. It works by interrupting the communication between melanocytes (pigment-producing cells) and the surrounding skin cells that trigger them — essentially turning down the signal that causes your skin to overproduce pigment after sun exposure or inflammation. Notably gentle with very low irritation potential, making it a good alternative for those who can't tolerate stronger actives like retinoids or AHAs.",
    concerns: ["dark_spots"],
    delphi_consensus: true,
    icon: "🌟"
  },

  // ─── DELPHI CONSENSUS: Dry Skin ───────────────────────────────────────────
  {
    name: "Hyaluronic Acid",
    aliases: ["sodium hyaluronate", "hyaluronan"],
    category: "Hydration",
    benefit: "The ultimate hydration ingredient, with Delphi consensus across dermatologists for dry skin. Hyaluronic acid is a molecule that naturally exists in your skin and joints — it can hold up to 1,000× its own weight in water, acting like a sponge that pulls moisture into the outer layers of skin. Clinical studies confirm it significantly improves hydration and plumpness. Look for products with multiple molecular weights to hydrate both the surface and deeper skin layers.",
    concerns: ["dry_skin"],
    delphi_consensus: true,
    pubmed_refs: [
      { title: "Benefits of topical hyaluronic acid for skin quality and signs of aging", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10078143/" },
    ],
    icon: "💧"
  },
  {
    name: "Ceramides",
    aliases: ["ceramide np", "ceramide ap", "ceramide eop", "ceramide 1", "ceramide 3"],
    category: "Barrier",
    benefit: "Think of ceramides as the mortar between the bricks of your skin — they make up roughly 50% of the lipid barrier that keeps moisture in and irritants out. When this barrier is damaged (from over-exfoliating, harsh cleansers, or skin conditions like eczema), ceramide levels drop and skin becomes dry, tight, and reactive. Topical ceramides have been shown in clinical studies to replenish these depleted lipids and restore barrier function. Backed by Delphi consensus for dry and compromised skin.",
    concerns: ["dry_skin"],
    delphi_consensus: true,
    pubmed_refs: [
      { title: "Ceramides and Skin Health: New Insights", url: "https://pubmed.ncbi.nlm.nih.gov/39912256/" },
      { title: "Skin hydration is significantly increased by a ceramide-formulated cream", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6197824/" },
    ],
    icon: "🛡️"
  },
  {
    name: "Glycerin",
    aliases: ["glycerol"],
    category: "Hydration",
    benefit: "One of the most well-studied moisturising ingredients in dermatology, with Delphi consensus for dry skin. Glycerin is a humectant — it attracts water from the air and from deeper skin layers up into the outermost layer (stratum corneum), keeping it soft and supple. It also forms a light protective film that slows moisture loss. It's safe, non-irritating, and suitable for every skin type, which is why it appears in almost every well-formulated moisturiser.",
    concerns: ["dry_skin"],
    delphi_consensus: true,
    icon: "💧"
  },
  {
    name: "Petrolatum",
    aliases: ["petroleum jelly", "white petrolatum"],
    category: "Barrier",
    benefit: "One of the most effective moisturising ingredients ever studied, with Delphi consensus and FDA recognition as an OTC skin protectant. Petrolatum works as an occlusive — it sits on top of the skin and physically seals in moisture, reducing what scientists call transepidermal water loss (TEWL) by up to 98%. Unlike actives, it doesn't penetrate skin; it simply creates a breathable seal that lets your skin heal and hydrate itself underneath. Hypoallergenic and ideal for very dry or compromised skin.",
    concerns: ["dry_skin"],
    delphi_consensus: true,
    fda_note: "FDA-recognized OTC skin protectant ingredient.",
    cosing_note: "EU CosIng: Petrolatum (White Petrolatum) is listed in Annex II (prohibited) unless the full refining history is known and proven to be non-carcinogenic. Only fully refined petrolatum that complies with purity specifications is permitted under Regulation (EC) No 1223/2009.",
    icon: "🛡️"
  },
  {
    name: "Squalane",
    aliases: ["squalene"],
    category: "Moisturizing",
    benefit: "A Delphi-recognised emollient that's closer to your own skin than almost any other ingredient — squalane is a stabilised version of squalene, a lipid your skin naturally produces (and produces less of as you age). Plant-derived squalane (typically from olives or sugarcane) is lightweight, absorbs quickly, and won't clog pores. It replenishes the skin's lipid content, smooths texture, and improves barrier function without the greasy feel of heavier oils.",
    concerns: ["dry_skin"],
    delphi_consensus: true,
    icon: "💎"
  },

  // ─── DELPHI CONSENSUS: Large Pores & Oily Skin ───────────────────────────
  {
    name: "Bentonite Clay",
    aliases: ["kaolin", "kaolin clay"],
    category: "Pore Control",
    benefit: "A natural mineral clay with Delphi consensus for oily and large-pore skin. Bentonite and kaolin clays have a porous, charged structure that physically absorbs excess oil and draws out impurities from pores — like a magnet for sebum and debris. Regular use won't permanently shrink pores (nothing topical can), but it measurably reduces their appearance and keeps shine under control throughout the day.",
    concerns: ["large_pores", "oily_skin"],
    delphi_consensus: true,
    icon: "🪨"
  },

  // ─── ADDITIONAL FDA-HIGHLIGHTED INGREDIENTS ───────────────────────────────
  {
    name: "Parabens",
    aliases: ["methylparaben", "propylparaben", "butylparaben", "ethylparaben", "isobutylparaben"],
    category: "Preservative",
    benefit: "Parabens are among the most widely used preservatives in cosmetics — they prevent bacteria and mould from growing in your products, which is genuinely important for safety. They've been in use for decades and are very well studied. The FDA has reviewed the available data and currently has no evidence they pose a health risk at the concentrations used in cosmetics. That said, the EU takes a more cautious approach with stricter limits on certain parabens, especially in children's products.",
    concerns: [],
    fda_note: "FDA has reviewed available safety data and currently has no reason to believe parabens pose a hazard at concentrations used in cosmetics. FDA continues to evaluate new research.",
    cosing_note: "EU CosIng: Parabens are individually listed in Annex V (permitted preservatives). Methylparaben and Ethylparaben max 0.4% (as acid) each; combined paraben total max 0.8%. Propylparaben and Butylparaben max 0.14% combined; prohibited in leave-on products for children under 3. Isopropylparaben, Isobutylparaben, Phenylparaben, Benzylparaben, and Pentylparaben are prohibited (Annex II).",
    icon: "⚠️"
  },
  {
    name: "Fragrance",
    aliases: ["parfum", "fragrance", "perfume"],
    category: "Fragrance",
    benefit: "Fragrance makes products smell appealing, but it's one of the most common triggers of skin reactions in cosmetics — the FDA identifies it as a leading cause of contact dermatitis. The tricky part: 'Fragrance' or 'Parfum' on a label can legally represent a blend of dozens of undisclosed chemicals, including known allergens, because formulas are protected as trade secrets. If you have sensitive or reactive skin, fragrance-free products are the safer choice.",
    concerns: [],
    fda_note: "FDA notes fragrance is one of the most common causes of cosmetic-related allergic reactions. Sensitive skin types should patch-test fragranced products.",
    cosing_note: "EU CosIng: Under Regulation (EC) No 1223/2009 (as amended by Regulation 2023/1545), 26 allergens must be individually labeled on EU cosmetics when above 0.001% in leave-on and 0.01% in rinse-off products. An expanded list of ~80 allergens requires labeling from 2026. 'Parfum' or 'Aroma' may mask multiple undisclosed components.",
    icon: "🌺"
  },
  {
    name: "Phthalates",
    aliases: ["diethyl phthalate", "dep"],
    category: "Chemical",
    benefit: "Phthalates are used in cosmetics primarily as solvents and to help fragrance last longer on the skin. The FDA has reviewed the available safety data and hasn't found evidence of harm at the levels used in cosmetics. However, the science is ongoing — some animal studies have raised questions about hormonal effects, and the EU has prohibited certain phthalates (DBP, DEHP) while others remain under reassessment.",
    concerns: [],
    fda_note: "FDA has reviewed safety data and found no cause for concern at current cosmetic use levels, but continues to monitor the science.",
    cosing_note: "EU CosIng: Diethyl Phthalate (DEP) is currently permitted in EU cosmetics (not listed in Annex II prohibited list). However, the EU SCCS continues to reassess phthalates. DBP and DEHP are prohibited under Annex II.",
    icon: "⚠️"
  },
  {
    name: "Talc",
    aliases: [],
    category: "Powder",
    benefit: "Talc is a naturally occurring mineral used in face powders, eyeshadows, and blush to absorb oil and give a smooth, silky texture. The safety concern isn't talc itself — it's the fact that talc deposits can naturally contain asbestos fibres, a known carcinogen, if not properly processed. The FDA actively tests cosmetic talc products for contamination. Both the FDA and EU require talc to be verified asbestos-free, but testing standards and enforcement vary by manufacturer.",
    concerns: [],
    fda_note: "FDA warns that talc may be contaminated with asbestos. FDA has conducted sampling programs to test commercial cosmetic talc products.",
    cosing_note: "EU CosIng: Talc (Magnesium Hydrogen Metasilicate) is listed as permitted in EU cosmetics but must be free from asbestos fibers. SCCS has issued guidance requiring manufacturers to verify the absence of asbestiform fibers. Stricter controls apply for products used near children's airways.",
    icon: "⚠️"
  },
  {
    name: "Sulfates",
    aliases: ["sodium lauryl sulfate", "sls", "sodium laureth sulfate", "sles", "ammonium lauryl sulfate"],
    category: "Cleanser",
    benefit: "Sulfates are surfactants — molecules that attract both water and oil, allowing them to lift dirt, makeup, and sebum off your skin or hair and rinse away cleanly. They're what creates that satisfying lather in cleansers and shampoos. The downside: they're highly effective at removing oils, which means they can also strip your skin's natural lipid layer and disrupt the moisture barrier, especially with daily use. People with dry, sensitive, or eczema-prone skin often do better with sulfate-free formulas.",
    concerns: [],
    cosing_note: "EU CosIng: Sodium Lauryl Sulfate (SLS) and Sodium Laureth Sulfate (SLES) are permitted surfactants in EU cosmetics with no specific concentration restriction, but must comply with general cosmetic safety requirements. SLES may contain trace 1,4-dioxane — EU guidance requires manufacturers to minimize via purification.",
    icon: "⚠️"
  },
  {
    name: "1,4-Dioxane",
    aliases: ["dioxane"],
    category: "Contaminant",
    benefit: "1,4-Dioxane isn't something a brand intentionally adds — it's a chemical byproduct that forms during the manufacturing of certain ingredients like sodium laureth sulfate (SLES). It's classified as a probable human carcinogen by the FDA, which actively monitors cosmetic products for it. The good news: it can be removed through a purification step called vacuum stripping. In the EU, any detectable level is prohibited by law. In the US, the FDA has issued guidance to manufacturers to minimise it, though it isn't yet banned outright.",
    concerns: [],
    fda_note: "FDA identifies 1,4-dioxane as a potential cosmetic contaminant and a probable human carcinogen. FDA has issued guidance for industry to reduce levels through vacuum stripping during manufacturing.",
    cosing_note: "EU CosIng: 1,4-Dioxane is listed in Annex II as a prohibited substance in cosmetic products. Products containing ethoxylated surfactants must be purified to ensure 1,4-dioxane is not present at detectable levels under EU law.",
    icon: "⚠️"
  },

  // ─── PEPTIDES & PROTEINS ──────────────────────────────────────────────────
  {
    name: "Peptides",
    aliases: ["palmitoyl tripeptide", "acetyl hexapeptide", "copper peptide", "matrixyl", "argireline"],
    category: "Anti-aging",
    benefit: "Peptides are short chains of amino acids — essentially the building blocks your skin uses as signals. When applied topically, certain peptides act like messengers that tell your skin cells to produce more collagen and elastin, the proteins responsible for firmness and elasticity. Copper peptides go a step further, offering antioxidant properties and supporting the skin's natural repair process. They're a well-tolerated anti-aging option, particularly effective when paired with other actives like retinoids or Vitamin C.",
    concerns: ["lines_wrinkles"],
    icon: "⏳"
  },
  {
    name: "Allantoin",
    aliases: [],
    category: "Soothing",
    benefit: "A naturally derived compound found in plants like comfrey and sugar beets, allantoin is known for its gentle, multi-purpose action on skin. It works by softening the outer layer of skin cells, which helps with shedding dead cells and encourages new cell growth underneath. It also has anti-irritant properties, making it a reliable soother for reactive or compromised skin. The FDA recognises it as a safe and effective OTC skin protectant at 0.5–2%.",
    concerns: ["redness", "dry_skin"],
    fda_note: "FDA-recognized OTC skin protectant ingredient at 0.5–2%.",
    icon: "🌸"
  },
  {
    name: "Panthenol",
    aliases: ["provitamin b5", "d-panthenol", "dexpanthenol"],
    category: "Soothing",
    benefit: "Panthenol (pro-vitamin B5) is converted into pantothenic acid once it penetrates the skin — a vitamin that plays a key role in skin repair and regeneration. It's both a humectant (draws in moisture) and an emollient (seals it in), giving it genuine hydrating power. Research shows it reduces inflammation, supports wound healing, and improves skin elasticity over time. It's exceptionally gentle, making it a go-to ingredient in formulas designed for compromised or post-treatment skin.",
    concerns: ["dry_skin", "redness"],
    icon: "🌸"
  },

  // ─── SKIN EMOLLIENTS & OILS ───────────────────────────────────────────────
  {
    name: "Jojoba Oil",
    aliases: ["simmondsia chinensis"],
    category: "Moisturizing",
    benefit: "Despite being called an oil, jojoba is technically a liquid wax — and its molecular structure closely resembles your skin's own sebum, which is why it absorbs so well without leaving a greasy residue. Because it mimics natural sebum, it tends to be non-comedogenic (won't clog pores), making it one of the rare facial oils suitable for oily and acne-prone skin. It's also rich in Vitamin E, adding a mild antioxidant benefit.",
    concerns: ["dry_skin", "oily_skin"],
    icon: "🫒"
  },
  {
    name: "Rosehip Oil",
    aliases: ["rosa canina", "rosa rubiginosa"],
    category: "Moisturizing",
    benefit: "Rosehip oil punches above its weight for a plant-based oil — it's naturally rich in linoleic acid (which helps repair the skin barrier), Vitamin C (brightening), and small amounts of naturally occurring trans-retinoic acid (Vitamin A). This combination makes it genuinely useful for fading post-acne dark marks, hyperpigmentation, and early fine lines while deeply nourishing dry or damaged skin. Best used in the evening, as the Vitamin A content can make skin mildly more sun-sensitive.",
    concerns: ["dark_spots", "dry_skin"],
    icon: "🌹"
  },
  {
    name: "Argan Oil",
    aliases: ["argania spinosa", "argania spinosa kernel oil"],
    category: "Moisturizing",
    benefit: "Argan oil is packed with oleic acid, linoleic acid, and tocopherols (Vitamin E) — a fatty acid profile that makes it a strong emollient for dry skin and frizzy hair alike. On skin, it replenishes lipids and reduces moisture loss without a heavy finish. In hair, it smooths the cuticle, reduces breakage, and adds shine. It's one of the more versatile facial oils in that it suits most skin types, including combination skin.",
    concerns: ["dry_skin"],
    icon: "🫒"
  },
  {
    name: "Aloe Vera",
    aliases: ["aloe barbadensis", "aloe barbadensis leaf juice"],
    category: "Soothing",
    benefit: "The gel inside the aloe barbadensis leaf has been used for centuries to calm sunburnt and irritated skin — and modern research backs up what people have known intuitively. It works on multiple levels: as a humectant (draws moisture in), an anti-inflammatory (reduces redness and swelling), and a mild wound-healing agent. The FDA recognises it as a safe OTC skin protectant. It's one of the gentlest ingredients you'll find, suitable even for the most reactive skin types.",
    concerns: ["redness", "dry_skin"],
    fda_note: "FDA-recognized ingredient in OTC skin protectant products.",
    icon: "🌿"
  },

  // ─── HAIR-SPECIFIC ────────────────────────────────────────────────────────
  {
    name: "Biotin",
    aliases: ["vitamin b7", "vitamin h"],
    category: "Hair Growth",
    benefit: "Biotin (Vitamin B7) is essential for the production of keratin — the protein your hair, skin, and nails are made of. The catch: topical biotin sitting on the outside of your hair shaft can't actually enter the follicle, so the science for topical use is weak. Where biotin genuinely helps is internally — if your hair loss or brittleness is linked to a biotin deficiency (more common than many realise), oral supplementation has clinical support. Worth discussing with a doctor before investing heavily in biotin shampoos or serums.",
    concerns: [],
    icon: "🌱"
  },
  {
    name: "Keratin",
    aliases: [],
    category: "Hair Repair",
    benefit: "Keratin is the structural protein that your hair is literally made of — so when it's depleted by heat styling, chemical processing, or environmental damage, keratin treatments make intuitive sense. They work by temporarily filling in gaps in the hair cuticle, dramatically reducing frizz and improving manageability and shine. The important caveat: many salon keratin treatments and some at-home products release formaldehyde during application, which the FDA has specifically warned about. Look for formaldehyde-free formulas, and always ensure good ventilation during use.",
    concerns: [],
    fda_note: "FDA has warned that some keratin hair smoothing products release formaldehyde or formaldehyde-releasing preservatives, which are known carcinogens.",
    cosing_note: "EU CosIng: Formaldehyde (a common keratin treatment byproduct) is listed in Annex II (prohibited) in hair straightening products in the EU. Keratin treatments that release formaldehyde above 0.2% are banned in the EU. Formaldehyde-releasing preservatives have maximum permitted concentrations under Annex V.",
    icon: "💪"
  },
  {
    name: "Castor Oil",
    aliases: ["ricinus communis"],
    category: "Hair Growth",
    benefit: "Castor oil is a thick, ricinoleic acid-rich oil with a long tradition of use for hair growth and scalp health. Ricinoleic acid has documented anti-inflammatory properties, which may help with a dry or irritated scalp — a common underlying factor in hair thinning. Clinical evidence specifically for hair growth is limited, but its moisturising and anti-inflammatory benefits for the scalp are real. Because of its viscosity, it's best diluted with a lighter oil (like jojoba or argan) and massaged into the scalp rather than applied to hair lengths.",
    concerns: [],
    icon: "🌱"
  },
  {
    name: "Dimethicone",
    aliases: ["cyclomethicone", "cyclopentasiloxane", "silicone"],
    category: "Silicone",
    benefit: "Dimethicone is a silicone that works by coating the hair shaft or skin surface with a smooth, slip-enhancing film. In hair products, this means reduced frizz, easier detangling, and a glossy finish that lasts. On skin, it acts as a lightweight barrier that locks in moisture and creates a smooth base for makeup. The tradeoff in hair: silicones don't wash out easily with regular shampoo and gradually build up on the hair shaft, leading to weighed-down, dull hair over time. A clarifying shampoo once a week or fortnight resolves this.",
    concerns: [],
    icon: "🔬"
  },
];

export const CATEGORY_COLORS = {
  "Hydration": "bg-blue-100 text-blue-700 border-blue-200",
  "Exfoliant": "bg-orange-100 text-orange-700 border-orange-200",
  "Anti-aging": "bg-purple-100 text-purple-700 border-purple-200",
  "Brightening": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Barrier": "bg-green-100 text-green-700 border-green-200",
  "Soothing": "bg-pink-100 text-pink-700 border-pink-200",
  "Antioxidant": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Moisturizing": "bg-amber-100 text-amber-700 border-amber-200",
  "Sun Protection": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "Acne Treatment": "bg-red-100 text-red-700 border-red-200",
  "Pore Control": "bg-stone-100 text-stone-700 border-stone-200",
  "Preservative": "bg-gray-100 text-gray-700 border-gray-200",
  "Fragrance": "bg-rose-100 text-rose-700 border-rose-200",
  "Chemical": "bg-gray-100 text-gray-600 border-gray-200",
  "Powder": "bg-gray-100 text-gray-600 border-gray-200",
  "Contaminant": "bg-red-100 text-red-800 border-red-300",
  "Cleanser": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Hair Growth": "bg-green-100 text-green-700 border-green-200",
  "Hair Repair": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Hair Care": "bg-amber-100 text-amber-700 border-amber-200",
  "Silicone": "bg-slate-100 text-slate-700 border-slate-200",
};

/**
 * Given a list of ingredient strings, returns a map of
 * ingredient string → glossary entry (matched by name or alias).
 */
export function matchIngredients(ingredients) {
  const map = {};
  for (const ing of ingredients) {
    const lower = ing.toLowerCase().trim();
    for (const entry of INGREDIENT_GLOSSARY) {
      const nameMatch = lower.includes(entry.name.toLowerCase());
      const aliasMatch = entry.aliases.some(a => lower.includes(a.toLowerCase()));
      if (nameMatch || aliasMatch) {
        map[ing] = entry;
        break;
      }
    }
  }
  return map;
}