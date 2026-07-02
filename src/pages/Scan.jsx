import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Scan() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [step, setStep] = useState('idle'); // 'idle' | 'uploading' | 'extracting' | 'analyzing'
  const [preview, setPreview] = useState(null);

  const handleCancel = () => {
    setStep('idle');
    setPreview(null);
  };

  const handleFile = async (file) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setStep('uploading');

    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setStep('extracting');

    // Get user profile for personalized analysis
    const user = await base44.auth.me();
    const profile = user.profile || {};

    // Extract product info from image
    const extraction = await base44.integrations.Core.InvokeLLM({
      prompt: `Analyze this product image. Extract the product name, brand, category (skincare/haircare/bodycare/other), and list of ingredients you can see. If you can't see ingredients, make your best guess based on the product type.`,
      file_urls: [file_url],
      response_json_schema: {
        type: "object",
        properties: {
          name: { type: "string" },
          brand: { type: "string" },
          category: { type: "string", enum: ["skincare", "haircare", "bodycare", "other"] },
          ingredients: { type: "array", items: { type: "string" } }
        }
      }
    });

    setStep('analyzing');

    // Analyze product against user profile
    const analysis = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a skin/hair care expert. Give a PERSONALIZED analysis of this product specifically for this user — not a generic review.

Product: ${extraction.name} by ${extraction.brand}
Category: ${extraction.category}
Ingredients: ${(extraction.ingredients || []).join(', ')}

User Profile:
- Skin type: ${profile.skin_type || 'Unknown'}
- Hair type: ${profile.hair_type || 'Unknown'}
- Skin conditions: ${(profile.skin_conditions || []).join(', ') || 'None'}
- Goals: ${(profile.goals || []).join(', ') || 'None specified'}
- Climate: ${profile.climate || 'Unknown'}
- Ingredient sensitivities: ${(profile.sensitivities || []).join(', ') || 'None'}

IMPORTANT — Scoring rules:
- The score (1–10) must reflect how well this product matches THIS user's specific needs, not the product's general quality.
- A great product can score low if it doesn't align with this user's skin type, conditions, or goals.
- A basic product can score high if it perfectly matches their needs.
- score_explanation must be 2–3 sentences clearly explaining WHY this specific user got this score — reference their skin type, conditions, goals, or sensitivities directly.

Also provide:
- summary: brief 1–2 sentence overview of what the product does
- pros: benefits specifically relevant to this user's profile
- cons: drawbacks specifically relevant to this user's profile
- warnings: any ingredients that conflict with their sensitivities or could aggravate their conditions
- alternatives: 3 better-suited alternatives for this specific user`,
      response_json_schema: {
        type: "object",
        properties: {
          score: { type: "number" },
          score_explanation: { type: "string" },
          summary: { type: "string" },
          pros: { type: "array", items: { type: "string" } },
          cons: { type: "array", items: { type: "string" } },
          warnings: { type: "array", items: { type: "string" } },
          alternatives: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                brand: { type: "string" },
                reason: { type: "string" }
              }
            }
          }
        }
      }
    });

    // Save product
    const product = await base44.entities.Product.create({
      name: extraction.name || 'Unknown Product',
      brand: extraction.brand,
      category: extraction.category,
      image_url: file_url,
      ingredients: extraction.ingredients,
      analysis
    });

    setStep('idle');
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-6 pb-6" style={{ paddingTop: 'calc(2.5rem + env(safe-area-inset-top, 0px))' }}>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Scan Product</h1>
      </div>

      <div className="px-6">
        {/* Upload area */}
        {step === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-square max-w-sm rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 flex flex-col items-center justify-center gap-4 hover:bg-primary/10 transition-colors"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Camera className="w-10 h-10 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium">Tap to scan a product</p>
                <p className="text-sm text-muted-foreground mt-1">Take a photo or upload from gallery</p>
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            <div className="flex items-center gap-4 mt-6 w-full max-w-sm">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <Button
              variant="outline"
              className="mt-4 rounded-full gap-2"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => handleFile(e.target.files[0]);
                input.click();
              }}
            >
              <Upload className="w-4 h-4" />
              Upload from gallery
            </Button>
          </motion.div>
        )}

        {/* Preview + Loading */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full max-w-sm">
              <img src={preview} alt="Product" className="w-full rounded-3xl object-cover" />
              {step !== 'idle' && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    {step === 'analyzing' ? (
                      <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                    ) : (
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    )}
                  </div>
                  <div className="text-center">
                    {step === 'uploading' && <p className="font-medium">Uploading image...</p>}
                    {step === 'extracting' && <p className="font-medium">Reading product label...</p>}
                    {step === 'analyzing' && <p className="font-medium">Personalizing your analysis...</p>}
                    <p className="text-sm text-muted-foreground mt-1">
                      {step === 'uploading' && 'Sending to server'}
                      {step === 'extracting' && 'Identifying ingredients'}
                      {step === 'analyzing' && 'Matching to your profile'}
                    </p>
                  </div>
                  <button
                    onClick={handleCancel}
                    className="h-11 px-5 text-xs text-muted-foreground underline underline-offset-2 mt-1"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}