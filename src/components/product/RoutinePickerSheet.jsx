import React, { useState } from 'react';
import { Drawer } from 'vaul';
import { Check, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function PickerSheet({ label, value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-input bg-background text-sm">
          <span className={selected ? 'text-foreground' : 'text-muted-foreground'}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl border-t border-border outline-none">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-medium py-3 border-b border-border">
            {label}
          </p>
          <div style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}>
            {options.map(opt => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className="w-full flex items-center justify-between px-6 min-h-[52px] text-sm font-medium border-b border-border/50 last:border-0 active:bg-muted/50 transition-colors"
              >
                <span className={value === opt.value ? 'text-primary font-semibold' : ''}>{opt.label}</span>
                {value === opt.value && <Check className="w-4 h-4 text-primary" />}
              </button>
            ))}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

const STEP_OPTIONS = [
  { value: 'cleanser', label: 'Cleanser' },
  { value: 'toner', label: 'Toner' },
  { value: 'serum', label: 'Serum' },
  { value: 'moisturizer', label: 'Moisturizer' },
  { value: 'sunscreen', label: 'Sunscreen' },
  { value: 'mask', label: 'Mask' },
  { value: 'shampoo', label: 'Shampoo' },
  { value: 'conditioner', label: 'Conditioner' },
  { value: 'treatment', label: 'Treatment' },
  { value: 'oil', label: 'Oil' },
  { value: 'other', label: 'Other' },
];

const TIME_OPTIONS = [
  { value: 'morning', label: 'Morning' },
  { value: 'evening', label: 'Evening' },
  { value: 'both', label: 'Both' },
];

export function RoutineStepPicker({ value, onChange }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <PickerSheet label="Step type" value={value} onChange={onChange} options={STEP_OPTIONS} placeholder="Select step..." />;
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Select step..." />
      </SelectTrigger>
      <SelectContent>
        {STEP_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

export function RoutineTimePicker({ value, onChange }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <PickerSheet label="When to use" value={value} onChange={onChange} options={TIME_OPTIONS} placeholder="Select time..." />;
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="rounded-xl">
        <SelectValue placeholder="Select time..." />
      </SelectTrigger>
      <SelectContent>
        {TIME_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}