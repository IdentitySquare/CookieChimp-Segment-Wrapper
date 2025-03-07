import { createWrapper, resolveWhen } from '@segment/analytics-consent-tools';

// Define the CookieChimp interface
interface CookieChimpPreferences {
  acceptedCategories: string[];
  rejectedCategories: string[];
}

interface CookieChimp {
  visitorNeedsConsent: boolean;
  getUserPreferences: () => CookieChimpPreferences;
  validConsent: () => boolean;
}

// Extend the Window interface
declare global {
  interface Window {
    CookieChimp: CookieChimp;
  }
}

// Normalizes categories into the expected format { foo: true, bar: false }
const normalizeCategories = (
  preferences: CookieChimpPreferences
): Record<string, boolean> => {
  // Initialize object with rejected categories set to false
  const categories = preferences.rejectedCategories.reduce(
    (acc: Record<string, boolean>, category: string) => {
      acc[category] = false;
      return acc;
    },
    {}
  );

  // Add accepted categories set to true
  return preferences.acceptedCategories.reduce(
    (acc: Record<string, boolean>, category: string) => {
      acc[category] = true;
      return acc;
    },
    categories
  );
};

interface CookieChimpOptions {
  alwaysLoadSegment?: boolean;
}

export const withCookieChimpCMP = (
  analytics: any,
  options: CookieChimpOptions = {}
) => {
  const wrapper = createWrapper({
    // Wait to load wrapper or call "shouldLoadSegment" until window.CMP exists.
    shouldLoadWrapper: async () => {
      await resolveWhen(() => window.CookieChimp !== undefined, 500);
    },

    // Allow for control over wrapper + analytics initialization.
    // Delay any calls to analytics.load() until this function returns / resolves.
    shouldLoadSegment: async ctx => {
      if (options.alwaysLoadSegment) {
        return ctx.load({ consentModel: 'opt-out' });
      }

      if (window.CookieChimp.visitorNeedsConsent) {
        await resolveWhen(() => window.CookieChimp.validConsent(), 500);
        return ctx.load({ consentModel: 'opt-in' });
      } else {
        return ctx.load({ consentModel: 'opt-out' });
      }
    },

    getCategories: () => {
      return normalizeCategories(window.CookieChimp.getUserPreferences());
    },

    registerOnConsentChanged: setCategories => {
      window.addEventListener('cc:onUpdate', () => {
        setCategories(
          normalizeCategories(window.CookieChimp.getUserPreferences())
        );
      });
    },
  });

  return wrapper(analytics);
};
