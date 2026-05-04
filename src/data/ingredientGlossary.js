export const INGREDIENT_GLOSSARY = [
  // Humectants & Hydrators
  { name: "Hyaluronic Acid", aliases: ["sodium hyaluronate"], category: "Hydration", benefit: "Draws moisture into the skin, holding up to 1000x its weight in water. Great for all skin types.", icon: "💧" },
  { name: "Glycerin", aliases: ["glycerol"], category: "Hydration", benefit: "A humectant that attracts water to the skin's surface, keeping it soft and moisturized.", icon: "💧" },
  { name: "Aloe Vera", aliases: ["aloe barbadensis"], category: "Hydration", benefit: "Soothes, hydrates, and calms irritated skin. Ideal for sensitive and sunburned skin.", icon: "🌿" },

  // Exfoliants
  { name: "Salicylic Acid", aliases: ["bha", "beta hydroxy acid"], category: "Exfoliant", benefit: "Oil-soluble BHA that unclogs pores and reduces acne. Best for oily and acne-prone skin.", icon: "🎯" },
  { name: "Glycolic Acid", aliases: ["aha"], category: "Exfoliant", benefit: "AHA that exfoliates the surface, improves texture, and brightens skin tone.", icon: "✨" },
  { name: "Lactic Acid", aliases: [], category: "Exfoliant", benefit: "Gentle AHA that exfoliates and hydrates simultaneously. Good for sensitive skin.", icon: "✨" },
  { name: "Mandelic Acid", aliases: [], category: "Exfoliant", benefit: "Large-molecule AHA, very gentle. Great for sensitive or darker skin tones prone to hyperpigmentation.", icon: "✨" },

  // Actives & Anti-aging
  { name: "Retinol", aliases: ["retinyl palmitate", "retinaldehyde", "vitamin a"], category: "Anti-aging", benefit: "Speeds cell turnover, reduces wrinkles, and fades dark spots. Use at night; can cause dryness.", icon: "⏳" },
  { name: "Niacinamide", aliases: ["vitamin b3", "nicotinamide"], category: "Brightening", benefit: "Minimizes pores, fades hyperpigmentation, controls oil, and strengthens the skin barrier.", icon: "⭐" },
  { name: "Vitamin C", aliases: ["ascorbic acid", "l-ascorbic acid", "sodium ascorbyl phosphate", "ascorbyl glucoside"], category: "Brightening", benefit: "Powerful antioxidant that brightens skin, boosts collagen, and protects against UV damage.", icon: "🍊" },
  { name: "Peptides", aliases: ["palmitoyl tripeptide", "acetyl hexapeptide", "copper peptide"], category: "Anti-aging", benefit: "Amino acid chains that signal skin to produce more collagen, reducing fine lines.", icon: "⏳" },
  { name: "Ceramides", aliases: ["ceramide np", "ceramide ap", "ceramide eop"], category: "Barrier", benefit: "Lipids that restore and strengthen the skin barrier, locking in moisture.", icon: "🛡️" },

  // Soothing & Anti-inflammatory
  { name: "Centella Asiatica", aliases: ["cica", "gotu kola", "madecassoside", "asiaticoside"], category: "Soothing", benefit: "Calms redness and inflammation, promotes healing. Excellent for sensitive or acne-prone skin.", icon: "🌸" },
  { name: "Allantoin", aliases: [], category: "Soothing", benefit: "Soothes irritation and promotes skin regeneration. Very gentle and safe for all skin types.", icon: "🌸" },
  { name: "Panthenol", aliases: ["provitamin b5", "d-panthenol"], category: "Soothing", benefit: "Deeply hydrates and soothes skin, reduces redness and irritation.", icon: "🌸" },
  { name: "Green Tea Extract", aliases: ["camellia sinensis", "egcg"], category: "Antioxidant", benefit: "Rich in antioxidants, fights free radicals, and soothes inflammation.", icon: "🍵" },

  // Oils & Emollients
  { name: "Jojoba Oil", aliases: ["simmondsia chinensis"], category: "Moisturizing", benefit: "Closely mimics skin's natural sebum. Balances oil production and is non-comedogenic.", icon: "🫒" },
  { name: "Rosehip Oil", aliases: ["rosa canina"], category: "Moisturizing", benefit: "Rich in vitamin A and C, helps fade scars and hyperpigmentation while deeply nourishing.", icon: "🌹" },
  { name: "Squalane", aliases: ["squalene"], category: "Moisturizing", benefit: "Lightweight, non-greasy oil that hydrates and protects without clogging pores.", icon: "💎" },
  { name: "Argan Oil", aliases: ["argania spinosa"], category: "Moisturizing", benefit: "Rich in fatty acids and vitamin E. Excellent for dry skin and hair frizz control.", icon: "🫒" },

  // SPF & Protection
  { name: "Zinc Oxide", aliases: [], category: "Sun Protection", benefit: "Mineral sunscreen that physically blocks UVA/UVB rays. Great for sensitive skin.", icon: "☀️" },
  { name: "Titanium Dioxide", aliases: [], category: "Sun Protection", benefit: "Mineral sunscreen agent that reflects UV rays. Gentle and non-irritating.", icon: "☀️" },

  // Preservatives & Potential Irritants
  { name: "Parabens", aliases: ["methylparaben", "propylparaben", "butylparaben", "ethylparaben"], category: "Preservative", benefit: "Common preservatives that extend shelf life. Some people prefer to avoid them.", icon: "⚠️" },
  { name: "Fragrance", aliases: ["parfum", "fragrance"], category: "Fragrance", benefit: "Added scent. Can cause irritation or allergic reactions in sensitive skin.", icon: "🌺" },
  { name: "Alcohol", aliases: ["denatured alcohol", "sd alcohol", "alcohol denat"], category: "Solvent", benefit: "Helps products absorb quickly but can be drying and irritating with frequent use.", icon: "⚠️" },
  { name: "Sulfates", aliases: ["sodium lauryl sulfate", "sls", "sodium laureth sulfate", "sles"], category: "Cleanser", benefit: "Cleansing agents that create lather. Can strip natural oils and irritate sensitive scalps.", icon: "⚠️" },

  // Hair-specific
  { name: "Biotin", aliases: ["vitamin b7", "vitamin h"], category: "Hair Growth", benefit: "Strengthens hair structure and supports healthy growth.", icon: "🌱" },
  { name: "Keratin", aliases: [], category: "Hair Repair", benefit: "Protein that smooths the hair cuticle, reduces frizz, and repairs damage.", icon: "💪" },
  { name: "Castor Oil", aliases: ["ricinus communis"], category: "Hair Growth", benefit: "Thick oil that moisturizes the scalp and is believed to support hair growth.", icon: "🌱" },
  { name: "Argan Oil", aliases: ["argania spinosa kernel oil"], category: "Hair Care", benefit: "Tames frizz, adds shine, and nourishes dry or damaged hair.", icon: "✨" },
  { name: "Dimethicone", aliases: ["cyclomethicone", "cyclopentasiloxane"], category: "Silicone", benefit: "Smooths and conditions hair, adds shine. Can cause buildup with regular use.", icon: "🔬" },
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
  "Preservative": "bg-gray-100 text-gray-700 border-gray-200",
  "Fragrance": "bg-rose-100 text-rose-700 border-rose-200",
  "Solvent": "bg-gray-100 text-gray-600 border-gray-200",
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