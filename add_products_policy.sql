-- Create policy for admin writes on products
DROP POLICY IF EXISTS "Admins have full access to products" ON public.products;
CREATE POLICY "Admins have full access to products" 
  ON public.products FOR ALL 
  USING (
    auth.jwt() ->> 'email' IN ('admin@buildprouk.co.uk', 'kidfl@live.co.uk', 'info@buildprouk.co.uk')
  );
