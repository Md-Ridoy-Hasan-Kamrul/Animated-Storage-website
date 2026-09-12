import React, { memo, useEffect, useRef } from 'react';

/** Ignore micro-jitter; only then treat as drag (not a tab click). */
const DRAG_CLICK_THRESHOLD_PX = 8;

/**
 * Horizontal category tabs: mouse drag / wheel / touch scroll (no chevron icons).
 * Clicks still select a tab unless the pointer actually dragged past the threshold.
 */
const CategoryTabsScroll = memo(({ categories, active, onSelect }) => {
  const scrollerRef = useRef(null);
  const dragRef = useRef({
    tracking: false,
    dragging: false,
    startX: 0,
    startScrollLeft: 0,
    pointerId: null,
    suppressClick: false,
  });

  // Mouse wheel → horizontal scroll
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;

    const onWheel = (event) => {
      const dominant =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (dominant === 0) return;

      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;

      const next = Math.min(max, Math.max(0, el.scrollLeft + dominant));
      if (next === el.scrollLeft) return;

      event.preventDefault();
      el.scrollLeft = next;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Click-and-drag to scroll — only after movement exceeds threshold
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;

    const resetDrag = (extra = {}) => {
      dragRef.current = {
        tracking: false,
        dragging: false,
        startX: 0,
        startScrollLeft: 0,
        pointerId: null,
        suppressClick: false,
        ...extra,
      };
    };

    const onPointerDown = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      dragRef.current = {
        tracking: true,
        dragging: false,
        startX: event.clientX,
        startScrollLeft: el.scrollLeft,
        pointerId: event.pointerId,
        suppressClick: false,
      };
    };

    const onPointerMove = (event) => {
      const drag = dragRef.current;
      if (!drag.tracking) return;

      const deltaX = event.clientX - drag.startX;

      if (!drag.dragging) {
        if (Math.abs(deltaX) < DRAG_CLICK_THRESHOLD_PX) return;
        drag.dragging = true;
        drag.suppressClick = true;
        el.classList.add('is-dragging');
        try {
          el.setPointerCapture?.(event.pointerId);
        } catch {
          /* ignore */
        }
      }

      el.scrollLeft = drag.startScrollLeft - deltaX;
      event.preventDefault();
    };

    const endDrag = () => {
      const drag = dragRef.current;
      if (!drag.tracking) return;

      if (drag.dragging && drag.pointerId != null) {
        try {
          el.releasePointerCapture?.(drag.pointerId);
        } catch {
          /* already released */
        }
      }

      el.classList.remove('is-dragging');
      const suppressClick = drag.suppressClick;
      resetDrag({ suppressClick });
    };

    const onClickCapture = (event) => {
      if (!dragRef.current.suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      dragRef.current.suppressClick = false;
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove, { passive: false });
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
    el.addEventListener('lostpointercapture', endDrag);
    el.addEventListener('click', onClickCapture, true);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', endDrag);
      el.removeEventListener('pointercancel', endDrag);
      el.removeEventListener('lostpointercapture', endDrag);
      el.removeEventListener('click', onClickCapture, true);
      el.classList.remove('is-dragging');
    };
  }, []);

  // Keep active tab visible
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const chip = Array.from(root.querySelectorAll('[data-category]')).find(
      (node) => node.getAttribute('data-category') === active,
    );
    if (!chip) return;
    chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [active]);

  return (
    <div className="relative min-w-0 flex-1">
      <div
        ref={scrollerRef}
        className="category-tabs-scroll flex cursor-grab items-center gap-2 overflow-x-auto overscroll-x-contain pb-0.5 select-none"
        role="tablist"
        aria-label="Template categories"
      >
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-category={cat}
              onClick={() => onSelect(cat)}
              className={
                isActive
                  ? 'shrink-0 cursor-pointer rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-black'
                  : 'shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-[12px] font-medium text-zinc-400 transition-all duration-200 hover:bg-white/10 hover:text-white'
              }
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
});

CategoryTabsScroll.displayName = 'CategoryTabsScroll';

export default CategoryTabsScroll;
