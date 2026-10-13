-- =============================================================================
-- SUPABASE DATABASE SCHEMA FOR DEVESH DAS PORTFOLIO
-- Execute this script in your Supabase Dashboard: "SQL Editor" -> "New query" -> "Run"
-- =============================================================================

-- 1. Create Table: Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow any visitor (anon role) to insert their message
CREATE POLICY "Allow public anonymous insert to contact_messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Only authenticated admins/owners can view messages
CREATE POLICY "Allow authenticated read on contact_messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);


-- 2. Create Table: Visitor Analytics
CREATE TABLE IF NOT EXISTS public.visitor_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visited_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    page_path TEXT DEFAULT '/' NOT NULL,
    referrer TEXT,
    user_agent TEXT,
    screen_resolution TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.visitor_analytics ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow any visitor (anon role) to log page view
CREATE POLICY "Allow public anonymous insert to visitor_analytics"
ON public.visitor_analytics
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Only authenticated admins/owners can view visitor analytics
CREATE POLICY "Allow authenticated read on visitor_analytics"
ON public.visitor_analytics
FOR SELECT
TO authenticated
USING (true);

-- =============================================================================
-- SCHEMA SETUP COMPLETED
-- Messages submitted through the contact form will appear in Table: contact_messages
-- Page visits will automatically record in Table: visitor_analytics
-- =============================================================================
