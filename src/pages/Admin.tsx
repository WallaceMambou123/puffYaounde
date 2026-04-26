import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Loader2, LogOut, Pencil, Plus, Trash2, Settings, Package } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/components/ProductCard";

type ProductForm = {
  title: string;
  description: string;
  price: string;
  currency: string;
  category: string;
  is_published: boolean;
  image_url: string;
};

const emptyForm: ProductForm = {
  title: "",
  description: "",
  price: "",
  currency: "XOF",
  category: "",
  is_published: true,
  image_url: "",
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const qc = useQueryClient();
  const { data: settings } = useSiteSettings();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Settings form
  const [shopName, setShopName] = useState("");
  const [tagline, setTagline] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (settings) {
      setShopName(settings.shop_name);
      setTagline(settings.tagline ?? "");
      setWhatsapp(settings.whatsapp_number);
    }
  }, [settings]);

  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ["products", "admin"],
    enabled: !!user && isAdmin,
    queryFn: async (): Promise<(Product & { is_published: boolean })[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("id,title,description,price,currency,image_url,category,is_published")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center">
          <h1 className="font-display text-2xl text-primary">Accès refusé</h1>
          <p className="mt-2 text-muted-foreground">
            Votre compte ({user.email}) n'a pas le rôle administrateur. Demandez
            au propriétaire de la boutique d'ajouter votre <code className="px-1 bg-muted rounded">user_id</code> dans la table <code className="px-1 bg-muted rounded">user_roles</code> avec le rôle <code className="px-1 bg-muted rounded">admin</code>.
          </p>
          <Button
            className="mt-6"
            variant="outline"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/");
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
          </Button>
        </Card>
      </div>
    );
  }

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setImageFile(null);
    setDialogOpen(true);
  };

  const openEdit = (p: Product & { is_published: boolean }) => {
    setEditing(p);
    setForm({
      title: p.title,
      description: p.description ?? "",
      price: String(p.price),
      currency: p.currency,
      category: p.category ?? "",
      is_published: p.is_published,
      image_url: p.image_url ?? "",
    });
    setImageFile(null);
    setDialogOpen(true);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const path = `${user!.id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("products").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("products").getPublicUrl(path);
    return data.publicUrl;
  };

  const submitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageUrl = form.image_url;
      if (imageFile) imageUrl = await uploadImage(imageFile);

      const payload = {
        title: form.title,
        description: form.description || null,
        price: parseFloat(form.price),
        currency: form.currency,
        category: form.category || null,
        is_published: form.is_published,
        image_url: imageUrl || null,
      };

      if (editing) {
        const { error } = await supabase.from("products").update(payload).eq("id", editing.id);
        if (error) throw error;
        toast({ title: "Article modifié" });
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        toast({ title: "Article ajouté" });
      }
      qc.invalidateQueries({ queryKey: ["products"] });
      setDialogOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur inconnue";
      toast({ title: "Erreur", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Article supprimé" });
      qc.invalidateQueries({ queryKey: ["products"] });
    }
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSavingSettings(true);
    const { error } = await supabase
      .from("site_settings")
      .update({ shop_name: shopName, tagline: tagline || null, whatsapp_number: whatsapp })
      .eq("id", settings.id);
    setSavingSettings(false);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Paramètres enregistrés" });
      qc.invalidateQueries({ queryKey: ["site_settings"] });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div>
            <h1 className="font-display text-2xl text-primary">Tableau de bord</h1>
            <p className="text-xs text-muted-foreground">Connecté en tant que {user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              Voir le site
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/");
              }}
            >
              <LogOut className="h-4 w-4 mr-2" /> Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products"><Package className="h-4 w-4 mr-2" />Articles</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="h-4 w-4 mr-2" />Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">{products.length} article(s)</p>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openNew} className="bg-accent text-accent-foreground hover:bg-accent-glow">
                    <Plus className="h-4 w-4 mr-2" /> Nouvel article
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editing ? "Modifier l'article" : "Nouvel article"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={submitProduct} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Titre *</Label>
                      <Input
                        required
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        rows={3}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Prix *</Label>
                        <Input
                          required
                          type="number"
                          step="0.01"
                          min="0"
                          value={form.price}
                          onChange={(e) => setForm({ ...form, price: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Devise</Label>
                        <Input
                          value={form.currency}
                          onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Catégorie</Label>
                      <Input
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        placeholder="ex: Vagues lisses"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Image</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                      />
                      {form.image_url && !imageFile && (
                        <img src={form.image_url} alt="" className="h-24 w-24 object-cover rounded" />
                      )}
                    </div>
                    <div className="flex items-center justify-between rounded-md border border-border p-3">
                      <div>
                        <Label>Publié</Label>
                        <p className="text-xs text-muted-foreground">Visible sur la boutique</p>
                      </div>
                      <Switch
                        checked={form.is_published}
                        onCheckedChange={(v) => setForm({ ...form, is_published: v })}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={submitting}>
                        {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        {editing ? "Enregistrer" : "Ajouter"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {loadingProducts ? (
              <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin" /></div>
            ) : products.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="font-display text-xl text-primary">Aucun article</p>
                <p className="mt-2 text-muted-foreground">Cliquez sur "Nouvel article" pour commencer.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <Card key={p.id} className="overflow-hidden">
                    <div className="aspect-square bg-muted relative">
                      {p.image_url && (
                        <img src={p.image_url} alt={p.title} className="h-full w-full object-cover" />
                      )}
                      {!p.is_published && (
                        <div className="absolute top-2 right-2 bg-muted-foreground text-background text-xs px-2 py-0.5 rounded">
                          Brouillon
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-primary">{p.title}</h3>
                      <p className="text-accent font-display text-lg mt-1">
                        {formatPrice(p.price, p.currency)}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => openEdit(p)}>
                          <Pencil className="h-3.5 w-3.5 mr-1" /> Modifier
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteProduct(p.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="p-6 max-w-xl">
              <h2 className="font-display text-xl text-primary mb-4">Paramètres de la boutique</h2>
              <form onSubmit={saveSettings} className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom de la boutique</Label>
                  <Input value={shopName} onChange={(e) => setShopName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Slogan</Label>
                  <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Numéro WhatsApp (format international)</Label>
                  <Input
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+221771234567"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Indiquez le numéro avec l'indicatif pays (ex: +221, +33).
                  </p>
                </div>
                <Button type="submit" disabled={savingSettings}>
                  {savingSettings && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Enregistrer
                </Button>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;