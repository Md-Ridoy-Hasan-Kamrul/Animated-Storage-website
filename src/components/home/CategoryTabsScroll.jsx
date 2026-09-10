import React, { memo, useEffect, useRef } from 'react';

const DRAG_CLICK_THRESHOLD_PX = 6;

/**
 * Horizontal category tabs: mouse drag / wheel / touch scroll (no chevron icons).
 */
const CategoryTabsScroll = memo(({ categories, active, onSelect }) => {
  const scrollerRef = useRef(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
    pointerId: null,
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

  // Click-and-drag to scroll
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;

    const onPointerDown = (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      dragRef.current = {
        active: true,
        startX: event.clientX,
        startScrollLeft: el.scrollLeft,
        moved: false,
        pointerId: event.pointerId,
      };
      el.setPointerCapture?.(event.pointerId);
      el.classList.add('is-dragging');
    };

    const onPointerMove = (event) => {
      const drag = dragRef.current;
      if (!drag.active) return;

      const deltaX = event.clientX - drag.startX;
      if (Math.abs(deltaX) > DRAG_CLICK_THRESHOLD_PX) {
        drag.moved = true;
      }

      el.scrollLeft = drag.startScrollLeft - deltaX;
    };

    const endDrag = (event) => {
      const drag = dragRef.current;
      if (!drag.active) return;

      if (drag.pointerId != null) {
        try {
          el.releasePointerCapture?.(drag.pointerId);
        } catch {
          /* already released */
        }
      }

      el.classList.remove('is-dragging');
      dragRef.current = {
        active: false,
        startX: 0,
        startScrollLeft: 0,
        moved: drag.moved,
        pointerId: null,
      };
    };

    const onClickCapture = (event) => {
      if (!dragRef.current.moved) return;
      event.preventDefault();
      event.stopPropagation();
      dragRef.current.moved = false;
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
    el.addEventListener('click', onClickCapture, true);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', endDrag);
      el.removeEventListener('pointercancel', endDrag);
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
                  ? 'shrink-0 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-black'
                  : 'shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white'
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
