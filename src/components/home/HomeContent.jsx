import React, {
  memo,
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { ChevronDown } from 'lucide-react';
import {
  CATEGORIES,
  TEMPLATES,
  categoryHasTemplates,
} from '../../data/templates';
import TemplateCard from './TemplateCard';
import ComingSoonTube from '../ComingSoonTube';

const SORT_OPTIONS = ['Featured', 'Popular', 'Recent'];
const PRICING_OPTIONS = ['Free'];

const PillDropdown = memo(({ label, value, options, onChange, ariaLabel }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full bg-[#2a2a2a] px-3.5 py-1.5 text-[12px] font-medium text-zinc-200 transition-colors hover:bg-[#333] hover:text-white"
      >
        {label}
        <ChevronDown
          size={14}
          strokeWidth={1.75}
          className={`text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 top-[calc(100%+8px)] z-50 min-w-[132px] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1c1c1c] py-2 shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
        >
          {options.map((option) => {
            const selected = option === value;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={
                  selected
                    ? 'flex w-full px-4 py-2.5 text-left text-[13px] font-medium text-white'
                    : 'flex w-full px-4 py-2.5 text-left text-[13px] font-medium text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-zinc-200'
                }
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
});

PillDropdown.displayName = 'PillDropdown';

const FilterBar = memo(({
  active,
  onSelect,
  onClear,
  sort,
  onSortChange,
  pricing,
  onPricingChange,
}) => (
  <div className="sticky top-[var(--kmotion-header-height,88px)] z-40 border-b border-white/[0.06] bg-black/90 backdrop-blur-md">
    <div
      className="mx-auto flex max-w-[1600px] items-center gap-3 py-3"
      style={{
        paddingLeft: 'var(--kmotion-content-px, 16px)',
        paddingRight: 'var(--kmotion-content-px, 16px)',
      }}
    >
      <div className="scrollbar-hide flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-0.5">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelect(cat)}
              className={
                isActive
                  ? 'shrink-0 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-black'
                  : 'shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white'
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="hidden shrink-0 items-center gap-3 md:flex">
        <button
          type="button"
          onClick={onClear}
          className="text-[12px] font-medium text-zinc-500 transition-colors hover:text-white"
        >
          Clear all
        </button>

        <PillDropdown
          label={sort}
          value={sort}
          options={SORT_OPTIONS}
          onChange={onSortChange}
          ariaLabel="Sort by"
        />

        <PillDropdown
          label="Pricing"
          value={pricing}
          options={PRICING_OPTIONS}
          onChange={onPricingChange}
          ariaLabel="Pricing"
        />
      </div>
    </div>
  </div>
));

FilterBar.displayName = 'FilterBar';

const HomeContent = memo(() => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState('Popular');
  const [pricing, setPricing] = useState('Free');

  const onSelect = useCallback((cat) => setActiveCategory(cat), []);
  const onClear = useCallback(() => setActiveCategory('All'), []);
  const onSortChange = useCallback((next) => setSort(next), []);
  const onPricingChange = useCallback((next) => setPricing(next), []);

  const showTemplates = categoryHasTemplates(activeCategory);

  const visible = useMemo(() => {
    if (!showTemplates) return [];

    let list = [...TEMPLATES];

    if (activeCategory !== 'All') {
      list = list.filter((t) => t.category === activeCategory);
    }

    list = list.filter((t) => (t.pricing || 'Free') === pricing);

    if (sort === 'Recent') return [...list].reverse();
    return list;
  }, [activeCategory, sort, pricing, showTemplates]);

  return (
    <div className="pb-24">
      <FilterBar
        active={activeCategory}
        onSelect={onSelect}
        onClear={onClear}
        sort={sort}
        onSortChange={onSortChange}
        pricing={pricing}
        onPricingChange={onPricingChange}
      />

      <section
        className="mx-auto max-w-[1600px] pt-5"
        style={{
          paddingLeft: 'var(--kmotion-content-px, 16px)',
          paddingRight: 'var(--kmotion-content-px, 16px)',
        }}
      >
        {showTemplates ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 min-[375px]:gap-x-5 min-[375px]:gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((item) => (
              <div key={item.id} className="mx-auto w-full max-w-md sm:mx-0 sm:max-w-none">
                <TemplateCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <ComingSoonTube key={activeCategory} text="Coming Soon" />
        )}
      </section>
    </div>
  );
});

HomeContent.displayName = 'HomeContent';

export default HomeContent;
