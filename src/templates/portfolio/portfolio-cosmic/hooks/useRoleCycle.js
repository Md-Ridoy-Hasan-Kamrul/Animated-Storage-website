import { useEffect, useState } from 'react';
import { HERO_ROLES, ROLE_CYCLE_MS } from '../constants';
import { nextCycleIndex } from '../utils/cycleIndex';

export function useRoleCycle() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => nextCycleIndex(i, HERO_ROLES.length));
    }, ROLE_CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  return {
    role: HERO_ROLES[roleIndex],
    roleIndex,
  };
}
