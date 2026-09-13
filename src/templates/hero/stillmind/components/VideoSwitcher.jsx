import React, { memo } from 'react';
import { VIDEO_LABELS } from '../constants';

const VideoSwitcher = memo(({ activeVideo, onSelect, inkClass, durationClass }) => (
  <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6">
    {VIDEO_LABELS.map((label, index) => {
      const isActive = index === activeVideo;
      return (
        <button
          key={label}
          type="button"
          onClick={() => onSelect(index)}
          className={`border-b pb-1 text-xs sm:text-sm ${durationClass} ${inkClass} ${
            isActive
              ? 'border-current opacity-100'
              : 'border-transparent opacity-50 hover:opacity-80'
          }`}
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {label}
        </button>
      );
    })}
  </div>
));

VideoSwitcher.displayName = 'VideoSwitcher';

export default VideoSwitcher;
