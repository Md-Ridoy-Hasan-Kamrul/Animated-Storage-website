import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SourceDocsPanel from '../SourceDocsPanel';
import { copyTextToClipboard } from '../../../utils/copyTextToClipboard';

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));

jest.mock('../../../utils/copyTextToClipboard', () => ({
  copyTextToClipboard: jest.fn(async () => true),
}));

jest.mock('../../../hooks/useTemplateSourceDocs', () => ({
  useTemplateSourceDocs: () => ({
    usage: 'USAGE_BODY',
    code: 'CODE_BODY',
    skill: 'SKILL_BODY',
    codeStatus: 'ready',
    componentName: 'GalleryHeading',
  }),
}));

describe('SourceDocsPanel', () => {
  beforeEach(() => {
    copyTextToClipboard.mockClear();
  });

  it('renders Usage / Code / Skill.md tabs and copies the active tab', async () => {
    const user = userEvent.setup();
    render(<SourceDocsPanel template={{ id: 'matte-rise' }} />);

    expect(screen.getByRole('tab', { name: 'Usage' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('USAGE_BODY')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Copy Usage' }));
    expect(copyTextToClipboard).toHaveBeenCalledWith('USAGE_BODY');

    await user.click(screen.getByRole('tab', { name: 'Code' }));
    expect(screen.getByText('CODE_BODY')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Copy Code' }));
    expect(copyTextToClipboard).toHaveBeenCalledWith('CODE_BODY');

    await user.click(screen.getByRole('tab', { name: 'Skill.md' }));
    expect(screen.getByText('SKILL_BODY')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Copy Skill.md' }));
    expect(copyTextToClipboard).toHaveBeenCalledWith('SKILL_BODY');
  });

  it('keeps a single Code tab (no React/Vue code switcher)', () => {
    render(<SourceDocsPanel template={{ id: 'matte-rise' }} />);
    expect(screen.queryByRole('tab', { name: 'React' })).not.toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: 'Vue' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });
});
