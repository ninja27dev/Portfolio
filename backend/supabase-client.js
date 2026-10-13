/**
 * Supabase Client Integration for Devesh Das Portfolio
 * Connects client-side JavaScript to Supabase PostgreSQL database via @supabase/supabase-js
 * 
 * Instructions:
 * 1. Create a free project at https://supabase.com
 * 2. In Supabase Dashboard -> Project Settings -> API:
 *    - Copy "Project URL" into SUPABASE_URL below
 *    - Copy "anon public" key into SUPABASE_ANON_KEY below
 * 3. Run schema.sql in Supabase SQL Editor.
 */

(function () {
  'use strict';

  // ===========================================================================
  // 1. SUPABASE CREDENTIALS (PASTE YOUR KEYS HERE)
  // ===========================================================================
  const SUPABASE_CONFIG = {
    url: 'https://wbrhwviebffklukvcahb.supabase.co',    // e.g. https://abcdefghijklm.supabase.co
    anonKey: 'sb_publishable_fZCOjBJyfPq0ZlcYZ7ykXg_LcXGRxz6'   // Supabase publishable key
  };

  let client = null;
  const isConfigured = () => {
    return (
      SUPABASE_CONFIG.url &&
      SUPABASE_CONFIG.anonKey &&
      !SUPABASE_CONFIG.url.includes('YOUR_SUPABASE') &&
      !SUPABASE_CONFIG.anonKey.includes('YOUR_SUPABASE')
    );
  };

  function getClient() {
    if (client) return client;
    if (typeof window.supabase !== 'undefined' && isConfigured()) {
      try {
        client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      } catch (err) {
        console.error('[Supabase Init Error]', err);
      }
    }
    return client;
  }

  // ===========================================================================
  // 2. INSERT CONTACT MESSAGE
  // ===========================================================================
  window.saveContactMessage = async function (name, email, message) {
    const sb = getClient();

    if (!sb) {
      console.info(
        '[Supabase Demo Mode] Contact message received:',
        { name, email, message },
        '\nTo save live messages, paste your Supabase keys into backend/supabase-client.js'
      );
      return {
        success: true,
        mode: 'demo',
        message: 'Message registered in local preview mode.'
      };
    }

    try {
      const { data, error } = await sb
        .from('contact_messages')
        .insert([
          {
            name: name,
            email: email,
            message: message,
            status: 'unread'
          }
        ]);

      if (error) {
        console.error('[Supabase Insert Error]', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data };
    } catch (err) {
      console.error('[Supabase Network Error]', err);
      return { success: false, error: err.message };
    }
  };

  // ===========================================================================
  // 3. TRACK VISITOR ANALYTICS
  // ===========================================================================
  window.trackVisitor = async function (pagePath = window.location.pathname) {
    const sb = getClient();
    if (!sb) {
      console.info('[Supabase Analytics] Visitor tracking is active. Add keys to log live entries.');
      return;
    }

    try {
      await sb
        .from('visitor_analytics')
        .insert([
          {
            page_path: pagePath,
            referrer: document.referrer || 'Direct Visit',
            user_agent: navigator.userAgent || 'Unknown',
            screen_resolution: `${window.screen.width}x${window.screen.height}`
          }
        ]);
    } catch (err) {
      // Graceful fail for background telemetry
    }
  };

  // Automatically track on initial page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.trackVisitor());
  } else {
    window.trackVisitor();
  }

  // Expose configuration helper globally
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
})();
