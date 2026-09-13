import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import HeroHeadline from '../components/HeroHeadline';
import HoverZones from '../components/HoverZones';
import NikeCta from '../components/NikeCta';
import SpotlightReveal from '../components/SpotlightReveal';
import StatsCard from '../components/StatsCard';
import {
  CTA_LABEL,
  HEADLINE_LINE_FOUR,
  HEADLINE_LINE_ONE,
  STAT_SUBTITLE,
  STAT_TITLE,
  STAT_VALUE,
} from '../constants';
import { OVERLAY_IMAGE_LOCAL, REVEAL_VIDEO } from '../content';

describe('Nike Hover chrome', () => {
  it('renders the 78% glass card copy', () => {
    render(<StatsCard />);
    expect(screen.getByText(STAT_VALUE)).toBeInTheDocument();
    expect(screen.getByText(STAT_TITLE)).toBeInTheDocument();
    expect(screen.getByText(STAT_SUBTITLE)).toBeInTheDocument();
  });

  it('renders the aerospace headline mix', () => {
    render(<HeroHeadline />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(HEADLINE_LINE_ONE);
    expect(heading).toHaveTextContent(HEADLINE_LINE_FOUR);
    expect(heading).toHaveTextContent('Everyday');
  });

  it('renders the Nike CTA label', () => {
    render(<NikeCta />);
    expect(screen.getByText(CTA_LABEL)).toBeInTheDocument();
  });

  it('toggles play from desktop hover zones', () => {
    const onPlay = jest.fn();
    const { rerender } = render(
      <HoverZones isMobile={false} onPlay={onPlay} />,
    );
    fireEvent.mouseEnter(screen.getByTestId('nike-zone-right'));
    expect(onPlay).toHaveBeenCalledWith(true);
    fireEvent.mouseLeave(screen.getByTestId('nike-zone-right'));
    expect(onPlay).toHaveBeenCalledWith(false);

    rerender(<HoverZones isMobile onPlay={onPlay} />);
    expect(screen.getByTestId('nike-zone-mobile')).toBeInTheDocument();
    expect(screen.queryByTestId('nike-zone-right')).not.toBeInTheDocument();
  });

  it('mounts the masked overlay image and video', () => {
    const { container } = render(
      <SpotlightReveal
        imageSrc={OVERLAY_IMAGE_LOCAL}
        videoSrc={REVEAL_VIDEO}
        isPlaying={false}
        baseRadius={520}
      />,
    );
    expect(container.querySelector('video')).toHaveAttribute('src', REVEAL_VIDEO);
    expect(container.querySelector('image')).toHaveAttribute('href', OVERLAY_IMAGE_LOCAL);
    expect(container.querySelectorAll('circle')).toHaveLength(6);
  });
});
