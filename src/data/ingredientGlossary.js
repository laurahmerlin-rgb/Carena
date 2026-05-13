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
    benefit: "Achieved 96.8% consensus among cosmetic dermatologists for lines & wrinkles (Delphi study). Also top-recommended for acne, dark spots, large pores, and oily skin. Speeds cell turnover, stimulates collagen production, and fades dark spots. Use at night; start slowly as it can cause initial dryness and irritation.",
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
    benefit: "Achieved 88.7% consensus for lines & wrinkles and strong consensus for dark spots (Delphi study). Powerful antioxidant that neutralizes free radicals, stimulates collagen synthesis, brightens skin tone, and protects against UV-induced damage. Most effective at L-ascorbic acid concentrations of 10–20%.",
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
    benefit: "Achieved 96.8% consensus for lines & wrinkles and top recommendation for redness (Delphi study). FDA-recognized physical UV filters that reflect UVA and UVB rays. Zinc oxide and titanium dioxide are the only two sunscreen active ingredients the FDA currently considers Category I (generally recognized as safe and effective — GRASE). Ideal for sensitive skin and rosacea.",
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
    benefit: "Achieved 82.3% consensus for lines & wrinkles (Delphi study). Absorbs UV radiation and converts it to heat. Provides broad-spectrum protection. FDA has requested additional safety data on several chemical sunscreen actives; they remain on the market but are not yet classified as GRASE by the FDA.",
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
    benefit: "Strong Delphi consensus for acne. FDA-recognized Beta Hydroxy Acid (BHA). Oil-soluble, so it penetrates deep into pores to dissolve sebum and dead skin cells. Reduces blackheads, whiteheads, and inflammatory acne. FDA guidelines recommend concentrations of 0.5–2% for OTC acne products.",
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
    benefit: "Delphi consensus ingredient for acne. Kills acne-causing bacteria (C. acnes) and reduces inflammation. FDA-approved OTC acne treatment at concentrations of 2.5–10%. Can bleach fabrics; may cause initial dryness.",
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
    benefit: "Delphi consensus for acne and redness. Kills acne-causing bacteria, reduces post-acne dark marks, and calms redness associated with rosacea. Safe during pregnancy. Available OTC at lower concentrations and as a prescription at 15–20%.",
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
    benefit: "Delphi consensus for acne, large pores, oily skin, and dark spots. Minimizes pore appearance, regulates sebum, fades hyperpigmentation, reduces redness, and strengthens the skin barrier. Well-tolerated by all skin types including sensitive skin.",
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
    benefit: "Delphi consensus for redness. Clinically shown to calm inflammation, strengthen the skin barrier, and reduce redness. Active compounds (madecassoside, asiaticoside) support wound healing and collagen synthesis.",
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
    benefit: "Delphi consensus for redness and antioxidant protection. EGCG (epigallocatechin gallate) is a potent antioxidant and anti-inflammatory compound. Soothes irritation, reduces redness, and protects against free radical damage.",
    concerns: ["redness"],
    delphi_consensus: true,
    icon: "🍵"
  },

  // ─── DELPHI CONSENSUS: Dark Spots ─────────────────────────────────────────
  {
    name: "Alpha Hydroxy Acids (AHAs)",
    aliases: ["glycolic acid", "lactic acid", "mandelic acid", "malic acid", "tartaric acid", "citric acid", "aha"],
    category: "Exfoliant",
    benefit: "Delphi consensus for dark spots and skin texture. FDA has studied AHAs extensively — they increase skin cell turnover, fade hyperpigmentation, and improve overall tone. FDA notes that AHAs increase UV sensitivity by up to 18%; sunscreen use is essential. Safe at ≤10% concentration with pH ≥3.5.",
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
    benefit: "Delphi consensus for dark spots. Derived from fungi, inhibits melanin production by blocking the enzyme tyrosinase. Effective for melasma, sun spots, and post-acne marks. Often combined with vitamin C for enhanced brightening.",
    concerns: ["dark_spots"],
    delphi_consensus: true,
    icon: "🌟"
  },
  {
    name: "Tranexamic Acid",
    aliases: [],
    category: "Brightening",
    benefit: "Emerging Delphi-recognized ingredient for dark spots and melasma. Inhibits the interaction between melanocytes and UV-activated keratinocytes, reducing melanin production. Well-tolerated with low irritation potential.",
    concerns: ["dark_spots"],
    delphi_consensus: true,
    icon: "🌟"
  },

  // ─── DELPHI CONSENSUS: Dry Skin ───────────────────────────────────────────
  {
    name: "Hyaluronic Acid",
    aliases: ["sodium hyaluronate", "hyaluronan"],
    category: "Hydration",
    benefit: "Delphi consensus for dry skin. Naturally occurring humectant that can hold up to 1,000x its weight in water. Draws moisture from the environment into the skin and from deeper skin layers to the surface. Effective at multiple molecular weights for surface and deeper hydration.",
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
    benefit: "Delphi consensus for dry skin. Ceramides make up approximately 50% of the skin's lipid barrier. Topical ceramides replenish depleted barrier lipids, lock in moisture, and protect against environmental irritants. Essential for eczema-prone and barrier-compromised skin.",
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
    benefit: "Delphi consensus for dry skin. One of the most effective and well-studied humectants in dermatology. Draws water into the outermost layer of skin (stratum corneum) and forms a protective layer against moisture loss. Safe and non-irritating for all skin types.",
    concerns: ["dry_skin"],
    delphi_consensus: true,
    icon: "💧"
  },
  {
    name: "Petrolatum",
    aliases: ["petroleum jelly", "white petrolatum"],
    category: "Barrier",
    benefit: "Delphi consensus for dry skin. FDA-recognized OTC skin protectant. Occlusive agent that creates a barrier over the skin to prevent transepidermal water loss (TEWL). Among the most effective moisturizing ingredients available. Hypoallergenic and safe for sensitive skin.",
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
    benefit: "Delphi-recognized emollient for dry skin. Naturally present in human sebum; plant-derived squalane (from olives or sugarcane) is a lightweight, non-comedogenic oil that replenishes lipids, smooths the skin surface, and improves barrier function without feeling greasy.",
    concerns: ["dry_skin"],
    delphi_consensus: true,
    icon: "💎"
  },

  // ─── DELPHI CONSENSUS: Large Pores & Oily Skin ───────────────────────────
  {
    name: "Bentonite Clay",
    aliases: ["kaolin", "kaolin clay"],
    category: "Pore Control",
    benefit: "Delphi consensus for large pores and oily skin. Absorbs excess sebum and impurities from pores. Regular use can temporarily minimize pore appearance and control shine.",
    concerns: ["large_pores", "oily_skin"],
    delphi_consensus: true,
    icon: "🪨"
  },

  // ─── ADDITIONAL FDA-HIGHLIGHTED INGREDIENTS ───────────────────────────────
  {
    name: "Parabens",
    aliases: ["methylparaben", "propylparaben", "butylparaben", "ethylparaben", "isobutylparaben"],
    category: "Preservative",
    benefit: "Widely used preservatives that prevent microbial growth and extend product shelf life. FDA has reviewed available data and does not have evidence that parabens in cosmetics pose a health risk, but continues to monitor emerging science.",
    concerns: [],
    fda_note: "FDA has reviewed available safety data and currently has no reason to believe parabens pose a hazard at concentrations used in cosmetics. FDA continues to evaluate new research.",
    cosing_note: "EU CosIng: Parabens are individually listed in Annex V (permitted preservatives). Methylparaben and Ethylparaben max 0.4% (as acid) each; combined paraben total max 0.8%. Propylparaben and Butylparaben max 0.14% combined; prohibited in leave-on products for children under 3. Isopropylparaben, Isobutylparaben, Phenylparaben, Benzylparaben, and Pentylparaben are prohibited (Annex II).",
    icon: "⚠️"
  },
  {
    name: "Fragrance",
    aliases: ["parfum", "fragrance", "perfume"],
    category: "Fragrance",
    benefit: "Added scent. FDA notes fragrance is a leading cause of cosmetic-related contact dermatitis and allergic reactions. Fragrance components may not be individually disclosed on labels due to trade secret protections.",
    concerns: [],
    fda_note: "FDA notes fragrance is one of the most common causes of cosmetic-related allergic reactions. Sensitive skin types should patch-test fragranced products.",
    cosing_note: "EU CosIng: Under Regulation (EC) No 1223/2009 (as amended by Regulation 2023/1545), 26 allergens must be individually labeled on EU cosmetics when above 0.001% in leave-on and 0.01% in rinse-off products. An expanded list of ~80 allergens requires labeling from 2026. 'Parfum' or 'Aroma' may mask multiple undisclosed components.",
    icon: "🌺"
  },
  {
    name: "Phthalates",
    aliases: ["diethyl phthalate", "dep"],
    category: "Chemical",
    benefit: "Used as solvents and fixatives in fragrances and nail products. FDA has reviewed available data and found no reason to conclude phthalates in cosmetics pose a safety risk to consumers, but acknowledges ongoing scientific study.",
    concerns: [],
    fda_note: "FDA has reviewed safety data and found no cause for concern at current cosmetic use levels, but continues to monitor the science.",
    cosing_note: "EU CosIng: Diethyl Phthalate (DEP) is currently permitted in EU cosmetics (not listed in Annex II prohibited list). However, the EU SCCS continues to reassess phthalates. DBP and DEHP are prohibited under Annex II.",
    icon: "⚠️"
  },
  {
    name: "Talc",
    aliases: [],
    category: "Powder",
    benefit: "Used in powders, eyeshadows, and blush to absorb moisture and improve texture. FDA actively tests cosmetic talc for asbestos contamination — a naturally occurring mineral that may be present in talc deposits.",
    concerns: [],
    fda_note: "FDA warns that talc may be contaminated with asbestos. FDA has conducted sampling programs to test commercial cosmetic talc products.",
    cosing_note: "EU CosIng: Talc (Magnesium Hydrogen Metasilicate) is listed as permitted in EU cosmetics but must be free from asbestos fibers. SCCS has issued guidance requiring manufacturers to verify the absence of asbestiform fibers. Stricter controls apply for products used near children's airways.",
    icon: "⚠️"
  },
  {
    name: "Sulfates",
    aliases: ["sodium lauryl sulfate", "sls", "sodium laureth sulfate", "sles", "ammonium lauryl sulfate"],
    category: "Cleanser",
    benefit: "Surfactants that create lather and remove oil, dirt, and product buildup. Effective cleansers but can strip the skin's natural oils and disrupt the barrier, leading to dryness and irritation — especially with daily use on sensitive or dry skin.",
    concerns: [],
    cosing_note: "EU CosIng: Sodium Lauryl Sulfate (SLS) and Sodium Laureth Sulfate (SLES) are permitted surfactants in EU cosmetics with no specific concentration restriction, but must comply with general cosmetic safety requirements. SLES may contain trace 1,4-dioxane — EU guidance requires manufacturers to minimize via purification.",
    icon: "⚠️"
  },
  {
    name: "1,4-Dioxane",
    aliases: ["dioxane"],
    category: "Contaminant",
    benefit: "Not an intentional ingredient — a manufacturing byproduct found in some products containing ethoxylated ingredients (like SLES). FDA monitors cosmetics for 1,4-dioxane levels and has set guidance for industry to minimize its presence, as it is a probable human carcinogen.",
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
    benefit: "Short amino acid chains that signal skin cells to produce more collagen and elastin. Copper peptides additionally have antioxidant properties and support wound healing. Used for fine lines, firmness, and overall skin renewal.",
    concerns: ["lines_wrinkles"],
    icon: "⏳"
  },
  {
    name: "Allantoin",
    aliases: [],
    category: "Soothing",
    benefit: "Naturally derived compound that soothes irritation, promotes skin-cell regeneration, and improves the skin's ability to bind moisture. FDA-recognized as a safe and effective skin protectant at 0.5–2% concentration.",
    concerns: ["redness", "dry_skin"],
    fda_note: "FDA-recognized OTC skin protectant ingredient at 0.5–2%.",
    icon: "🌸"
  },
  {
    name: "Panthenol",
    aliases: ["provitamin b5", "d-panthenol", "dexpanthenol"],
    category: "Soothing",
    benefit: "Pro-vitamin B5 that converts to pantothenic acid in the skin. Deeply hydrates, soothes inflammation, promotes wound healing, and improves skin elasticity. Safe for all skin types including sensitive and compromised skin.",
    concerns: ["dry_skin", "redness"],
    icon: "🌸"
  },

  // ─── SKIN EMOLLIENTS & OILS ───────────────────────────────────────────────
  {
    name: "Jojoba Oil",
    aliases: ["simmondsia chinensis"],
    category: "Moisturizing",
    benefit: "Technically a liquid wax that closely mimics the skin's natural sebum. Non-comedogenic, balances oil production, and is suitable for oily and acne-prone skin as well as dry skin. Rich in vitamin E.",
    concerns: ["dry_skin", "oily_skin"],
    icon: "🫒"
  },
  {
    name: "Rosehip Oil",
    aliases: ["rosa canina", "rosa rubiginosa"],
    category: "Moisturizing",
    benefit: "Rich in naturally occurring trans-retinoic acid (vitamin A), linoleic acid, and vitamin C. Helps fade post-acne marks, hyperpigmentation, and fine lines while deeply nourishing the skin.",
    concerns: ["dark_spots", "dry_skin"],
    icon: "🌹"
  },
  {
    name: "Argan Oil",
    aliases: ["argania spinosa", "argania spinosa kernel oil"],
    category: "Moisturizing",
    benefit: "Rich in oleic and linoleic fatty acids and tocopherols (vitamin E). Nourishes dry skin, reduces TEWL, and tames frizz in hair. A versatile oil for both skin and hair.",
    concerns: ["dry_skin"],
    icon: "🫒"
  },
  {
    name: "Aloe Vera",
    aliases: ["aloe barbadensis", "aloe barbadensis leaf juice"],
    category: "Soothing",
    benefit: "Gel from the aloe barbadensis leaf with anti-inflammatory, humectant, and wound-healing properties. FDA has approved aloe as an OTC skin protectant. Ideal for sunburn, sensitive, and irritated skin.",
    concerns: ["redness", "dry_skin"],
    fda_note: "FDA-recognized ingredient in OTC skin protectant products.",
    icon: "🌿"
  },

  // ─── HAIR-SPECIFIC ────────────────────────────────────────────────────────
  {
    name: "Biotin",
    aliases: ["vitamin b7", "vitamin h"],
    category: "Hair Growth",
    benefit: "B-vitamin essential for keratin synthesis. While biotin deficiency causes hair loss, evidence for topical biotin benefit is limited — oral supplementation may benefit those who are deficient.",
    concerns: [],
    icon: "🌱"
  },
  {
    name: "Keratin",
    aliases: [],
    category: "Hair Repair",
    benefit: "Structural protein that makes up the hair shaft. Topical keratin treatments temporarily fill gaps in the hair cuticle, reducing frizz, adding shine, and improving manageability. Some keratin treatments contain formaldehyde — FDA has warned about hair smoothing products that release formaldehyde.",
    concerns: [],
    fda_note: "FDA has warned that some keratin hair smoothing products release formaldehyde or formaldehyde-releasing preservatives, which are known carcinogens.",
    cosing_note: "EU CosIng: Formaldehyde (a common keratin treatment byproduct) is listed in Annex II (prohibited) in hair straightening products in the EU. Keratin treatments that release formaldehyde above 0.2% are banned in the EU. Formaldehyde-releasing preservatives have maximum permitted concentrations under Annex V.",
    icon: "💪"
  },
  {
    name: "Castor Oil",
    aliases: ["ricinus communis"],
    category: "Hair Growth",
    benefit: "Thick, ricinoleic acid-rich oil that moisturizes the scalp, may reduce inflammation, and is traditionally used to support hair growth and thickness. Best used as a scalp treatment diluted with a lighter carrier oil.",
    concerns: [],
    icon: "🌱"
  },
  {
    name: "Dimethicone",
    aliases: ["cyclomethicone", "cyclopentasiloxane", "silicone"],
    category: "Silicone",
    benefit: "Silicone-based polymer that coats the hair shaft to smooth the cuticle, reduce frizz, and add shine. Also used in skin products as a barrier agent and primer. Can cause product buildup in hair with regular use; clarifying shampoo recommended.",
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