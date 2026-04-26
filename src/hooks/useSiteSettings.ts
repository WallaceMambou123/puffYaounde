import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteSettings = {
  id: string;
  shop_name: string;
  whatsapp_number: string;
  tagline: string | null;
};

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<SiteSettings | null> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("id, shop_name, whatsapp_number, tagline")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}