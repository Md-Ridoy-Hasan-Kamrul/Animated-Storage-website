import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import {
  CHECK_ICON_SIZE,
  CHECK_SPRING,
  CHECK_STROKE,
  EMPTY_BANNER,
  LETS_GO_LABEL,
  READY_PREFIX,
  SERVICE_OPTIONS,
  SERVICE_SUBTITLE,
  SERVICE_TITLE,
} from '../constants';
import { readyMessage, toggleService } from '../utils/services';

const ServicePills = () => {
  const [services, setServices] = useState([]);

  return (
    <div>
      <h2 className="text-2xl font-medium tracking-tight mb-2">{SERVICE_TITLE}</h2>
      <p className="opacity-85 text-[#738273] mb-8">{SERVICE_SUBTITLE}</p>

      <div className="flex flex-wrap gap-3 mb-6">
        {SERVICE_OPTIONS.map((option) => {
          const active = services.includes(option);
          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => setServices((current) => toggleService(current, option))}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-base transition-colors ${
                active
                  ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform'
                  : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'
              }`}
            >
              {active ? (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={CHECK_SPRING}>
                  <Check size={CHECK_ICON_SIZE} strokeWidth={CHECK_STROKE} />
                </motion.span>
              ) : null}
              {option}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {services.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="italic text-xs"
          >
            {EMPTY_BANNER}
          </motion.p>
        ) : (
          <motion.div
            key="ready"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={CHECK_SPRING}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAFBF9] border rounded-2xl px-5 py-4">
              <p className="text-sm text-[#1C2E1E]">{readyMessage(READY_PREFIX, services)}</p>
              <button type="button" className="text-[#4D6D47] uppercase text-xs tracking-wide">
                {LETS_GO_LABEL} →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicePills;
