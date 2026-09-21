import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import InstallationPanel, { PACKAGE_MANAGERS } from '../InstallationPanel';
import { KMOTION_PACKAGE } from '../../../utils/kmotionNpmSnippet';
import { copyTextToClipboard } from '../../../utils/copyTextToClipboard';

jest.mock('../../../utils/copyTextToClipboard', () => ({
  copyTextToClipboard: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));

describe('InstallationPanel', () => {
  beforeEach(() => {
    copyTextToClipboard.mockClear();
  });

  it('renders Installation heading and step 1 for @kmotion/animation', () => {
    render(<InstallationPanel templateId="kage" />);
    expect(screen.getByRole('heading', { name: 'Installation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Install the package' })).toBeInTheDocument();
    expect(screen.getByText(KMOTION_PACKAGE)).toBeInTheDocument();
  });

  it('defaults to npm install + React Preview for the card id', () => {
    render(<InstallationPanel templateId="kage" />);
    const body = screen.getByText(/npm install @kmotion\/animation/).closest('code');
    expect(body?.textContent).toContain(`npm install ${KMOTION_PACKAGE}`);
    expect(body?.textContent).toContain(`import { Preview } from "${KMOTION_PACKAGE}/react";`);
    expect(body?.textContent).toContain('<Preview id="kage" />');
  });

  it('switches only the install line for package managers', () => {
    render(<InstallationPanel templateId="kage" />);

    fireEvent.click(screen.getByRole('tab', { name: 'pnpm' }));
    expect(screen.getByText(/pnpm add @kmotion\/animation/).closest('code')?.textContent).toContain(
      `pnpm add ${KMOTION_PACKAGE}`,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'bun' }));
    expect(screen.getByText(/bun add @kmotion\/animation/).closest('code')?.textContent).toContain(
      `bun add ${KMOTION_PACKAGE}`,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'yarn' }));
    expect(screen.getByText(/yarn add @kmotion\/animation/).closest('code')?.textContent).toContain(
      `yarn add ${KMOTION_PACKAGE}`,
    );
  });

  it('copies the full install snippet', async () => {
    render(<InstallationPanel templateId="kage" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy install command' }));
    await waitFor(() => {
      expect(copyTextToClipboard).toHaveBeenCalledWith(
        [
          PACKAGE_MANAGERS[0].command(KMOTION_PACKAGE),
          '',
          `import { Preview } from "${KMOTION_PACKAGE}/react";`,
          '',
          '<Preview id="kage" />',
        ].join('\n'),
      );
    });
  });
});
